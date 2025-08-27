def greedy_initial_solution(values, weights, capacity):
    n = len(values)
    items = list(range(n))
    items.sort(key=lambda i: values[i] / weights[i], reverse=True)

    solution = [0] * n
    total_weight = 0
    for i in items:
        if total_weight + weights[i] <= capacity:
            solution[i] = 1
            total_weight += weights[i]
    return solution
