

while (queue.notEmpty) {
  const task = queue.pop();
  task.execute();
}
