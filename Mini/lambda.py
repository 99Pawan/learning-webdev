import json
import boto3
import numpy as np

dynamodb = boto3.resource('dynamodb')
global_table = dynamodb.Table('knapsack_pso_global')
particles_table = dynamodb.Table('knapsack_pso_particles')

def lambda_handler(event, context):
    particle_id = event['particle_id']
    
    # Read particle data from DynamoDB
    response = particles_table.get_item(Key={'particle_id': particle_id})
    particle = response['Item']
    position = np.array(json.loads(particle['position']))
    velocity = np.array(json.loads(particle['velocity']))
    pbest = np.array(json.loads(particle['pbest']))
    pbest_fitness = particle['pbest_fitness']
    
    # Read global best from DynamoDB
    response = global_table.get_item(Key={'id': 'global'})
    gbest = np.array(json.loads(response['Item']['position']))
    gbest_fitness = response['Item']['fitness']
    
    # PSO parameters
    w = 0.5  # Inertia weight
    c1 = 1.5  # Personal best coefficient
    c2 = 1.5  # Global best coefficient
    r1 = np.random.rand(len(position))
    r2 = np.random.rand(len(position))
    
    # Update velocity
    velocity = w * velocity + c1 * r1 * (pbest - position) + c2 * r2 * (gbest - position)
    
    # Update position (binary PSO using sigmoid)
    sigmoid_v = 1 / (1 + np.exp(-velocity))
    position = (np.random.rand(len(position)) < sigmoid_v).astype(int)
    
    # Hardcoded knapsack problem data (modify as needed)
    weights = np.array([2, 3, 4, 5, 6])  # Item weights
    values = np.array([3, 4, 5, 6, 7])   # Item values
    capacity = 10                        # Knapsack capacity
    
    # Evaluate fitness
    total_weight = np.dot(position, weights)
    total_value = np.dot(position, values)
    new_fitness = total_value if total_weight <= capacity else 0
    
    # Update personal best in DynamoDB
    if new_fitness > pbest_fitness:
        pbest = position
        pbest_fitness = new_fitness
        particles_table.update_item(
            Key={'particle_id': particle_id},
            UpdateExpression='SET position = :pos, velocity = :vel, pbest = :pbest, pbest_fitness = :pfit',
            ExpressionAttributeValues={
                ':pos': json.dumps(position.tolist()),
                ':vel': json.dumps(velocity.tolist()),
                ':pbest': json.dumps(pbest.tolist()),
                ':pfit': pbest_fitness
            }
        )
        
        # Attempt to update global best with conditional write
        try:
            global_table.update_item(
                Key={'id': 'global'},
                UpdateExpression='SET position = :pos, fitness = :fit',
                ConditionExpression='fitness < :new_fit',
                ExpressionAttributeValues={
                    ':pos': json.dumps(position.tolist()),
                    ':fit': new_fitness,
                    ':new_fit': new_fitness
                }
            )
        except:
            pass  # Global best not updated if condition fails

    return {'statusCode': 200}