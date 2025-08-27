import math
import random
import matplotlib.pyplot as plt

# ------------------------------
# Deterministic DP Algorithm for 0/1 Knapsack
# ------------------------------
def dp_knapsack(n, weights, values, capacity):
    dp = [0] * (capacity + 1)
    for i in range(n):
        w = weights[i]
        v = values[i]
        for cap in range(capacity, w - 1, -1):
            dp[cap] = max(dp[cap], dp[cap - w] + v)
    return dp[capacity]

# ------------------------------
# Greedy Initialization and Repair Functions
# ------------------------------
def greedy_initial_solution(values, weights, capacity, swap_prob=0.3):
    """
    Generates a diverse greedy-based initial solution.
    
    This function first sorts the items in descending order of their value-to-weight ratio.
    Then, it randomly swaps adjacent items with a probability 'swap_prob' to introduce diversity.
    Finally, it performs the greedy selection to choose items until the capacity is reached.
    
    Args:
        values (list): List of item values.
        weights (list): List of item weights.
        capacity (int): Maximum allowed weight.
        swap_prob (float): Probability with which to swap adjacent items.
    
    Returns:
        list: A binary solution vector representing the selected items.
    """
    n = len(values)
    # Sort items by value-to-weight ratio (highest first)
    items = list(range(n))
    items.sort(key=lambda i: values[i] / weights[i], reverse=True)
    
    # Introduce diversity by randomly swapping adjacent items
    for i in range(len(items) - 1):
        if random.random() < swap_prob:
            items[i], items[i+1] = items[i+1], items[i]
    
    # Greedy selection based on the (perturbed) sorted order
    solution = [0] * n
    total_weight = 0
    for i in items:
        if total_weight + weights[i] <= capacity:
            solution[i] = 1
            total_weight += weights[i]
    return solution


def repair_solution(position, values, weights, capacity):
    n = len(position)
    total_weight = sum(w * x for w, x in zip(weights, position))
    if total_weight <= capacity:
        return position

    included = [(i, values[i] / weights[i]) for i in range(n) if position[i] == 1]
    included.sort(key=lambda x: x[1])

    new_position = position[:]
    for i, _ in included:
        new_position[i] = 0
        total_weight -= weights[i]
        if total_weight <= capacity:
            break
    return new_position

# ------------------------------
# PSO Helper Functions and Particle Class
# ------------------------------
def fitness_function(position, values, weights, capacity, penalty_lambda):
    total_value = sum(v * x for v, x in zip(values, position))
    total_weight = sum(w * x for w, x in zip(weights, position))
    penalty = penalty_lambda * max(0, total_weight - capacity)
    return total_value - penalty

class Particle:
    def __init__(self, dim, values, weights, capacity, penalty_lambda):
        self.dim = dim
        self.position = greedy_initial_solution(values, weights, capacity)
        for i in range(dim):
            if random.random() < 0.1:
                self.position[i] = 1 - self.position[i]
        self.position = repair_solution(self.position, values, weights, capacity)
        self.velocity = [random.uniform(-1, 1) for _ in range(dim)]
        self.best_position = list(self.position)
        self.best_fitness = fitness_function(self.position, values, weights, capacity, penalty_lambda)
    
    def update_personal_best(self, current_fitness):
        if current_fitness > self.best_fitness:
            self.best_fitness = current_fitness
            self.best_position = list(self.position)

# ------------------------------
# PSO Algorithm (without diversity)
# ------------------------------
def pso_knapsack(n, values, weights, capacity, penalty_lambda):
    swarm_k = 10
    swarm_size = max(10, int(swarm_k * (math.log(n) + math.log(capacity))))
    omega = 0.9
    T_max = 0.8
    T_min = 0.2
    alpha = 0.5
    # beta = 0.2
    gamma = 0.5
    delta = 0.1

    iter_cap = 1000
    k_iter = 10
    max_iter = min(iter_cap, int(k_iter * (math.log(n) + math.log(capacity))))
    if max_iter < 1:
        max_iter = 100
    k_stop = 20

    swarm = [Particle(n, values, weights, capacity, penalty_lambda) for _ in range(swarm_size)]
    global_best_particle = max(swarm, key=lambda p: p.best_fitness)
    global_best_position = list(global_best_particle.best_position)
    global_best_fitness = global_best_particle.best_fitness

    global_fitness_history = [global_best_fitness]
    no_improvement_count = 0

    for t in range(max_iter):
        c1 = 2.5 - 2 * (t / max_iter)
        c2 = 0.5 + 2 * (t / max_iter)
        T_iter = T_max - ((T_max - T_min) / max_iter) * t

        if t >= k_stop:
            fitness_improvement = global_fitness_history[-k_stop] - global_best_fitness
        else:
            fitness_improvement = float('inf')
        if fitness_improvement < 0.1*global_best_fitness:
            T_fitness = T_iter + delta
        else:
            T_fitness = T_iter

        T_adaptive = alpha * T_iter + gamma * T_fitness  # Removed beta * T_diversity
        
        for particle in swarm:
            for i in range(n):
                r1 = random.random()
                r2 = random.random()
                particle.velocity[i] = (
                    omega * particle.velocity[i]
                    + c1 * r1 * (particle.best_position[i] - particle.position[i])
                    + c2 * r2 * (global_best_position[i] - particle.position[i])
                )
        
        for particle in swarm:
            for i in range(n):
                prob = 1 / (1 + math.exp(-particle.velocity[i]))
                particle.position[i] = 1 if prob > T_adaptive else 0
            particle.position = repair_solution(particle.position, values, weights, capacity)

        for particle in swarm:
            current_fitness = fitness_function(particle.position, values, weights, capacity, penalty_lambda)
            particle.update_personal_best(current_fitness)
            if current_fitness > global_best_fitness:
                global_best_fitness = current_fitness
                global_best_position = list(particle.position)
                no_improvement_count = 0
            else:
                no_improvement_count += 1

        global_fitness_history.append(global_best_fitness)
        if no_improvement_count >= k_stop:
            break

    return sum(v * x for v, x in zip(values, global_best_position))

# ------------------------------
# Main Experiment and Error Analysis
# ------------------------------
def main():
    start_n = 100
    end_n = 1000
    step = 50
    capacity = 1000
    penalty_lambda = 100
    
    num_items_list = []
    error_percentage_list = []
    
    for n in range(start_n, end_n + 1, step):
        values = [random.randint(1, 100) for _ in range(n)]
        weights = [random.randint(1, 100) for _ in range(n)]
        # capacity = random.randint(1,1000)
        dp_optimal = dp_knapsack(n, weights, values, capacity)
        pso_value = pso_knapsack(n, values, weights, capacity, penalty_lambda)
        
        if dp_optimal > 0:
            error_percentage = abs(dp_optimal - pso_value) / dp_optimal * 100
        else:
            error_percentage = 0
        
        print(f"Items: {n}, DP: {dp_optimal}, PSO: {pso_value}, Error: {error_percentage:.2f}%")
        num_items_list.append(n)
        error_percentage_list.append(error_percentage)
    
    plt.figure(figsize=(10, 6))
    plt.plot(num_items_list, error_percentage_list, marker='o', linestyle='-')
    plt.xlabel("Number of Items")
    plt.ylabel("Error Percentage (%)")
    plt.title("Error Percentage of PSO vs. DP Optimal Value vs. Number of Items")
    plt.grid(True)
    plt.show()

if __name__ == "__main__":
    main()
