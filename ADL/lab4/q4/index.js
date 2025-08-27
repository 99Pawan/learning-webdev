const colors = ['#ff9999', '#99ff99', '#9999ff', '#ffff99', '#99ffff'];
document.getElementById('changeColorButton').addEventListener('click', () => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
});

document.getElementById('addItem').addEventListener('click', () => {
    const inputField = document.getElementById('itemInput');
    const newItem = inputField.value.trim();

    if (newItem) {
      const listItem = document.createElement('li');
      listItem.textContent = newItem;
      document.getElementById('itemList').appendChild(listItem);

      inputField.value = ''; // Clear the input field 
    }
});