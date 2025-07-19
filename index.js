//we start here

document
  .getElementById('taskInput')
  .addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
      handleAdd();
    }
  });

function add() {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  const checkboxId = 'checkbox' + Date.now();
  checkbox.setAttribute('id', checkboxId);
  const inputValue = document.getElementById('taskInput').value.trim();
  if (!inputValue) {
    return;
  }
  const checkboxLabel = document.createElement('label');
  checkboxLabel.textContent = inputValue;
  checkboxLabel.setAttribute('for', checkboxId);
  const li = document.createElement('li');
  li.appendChild(checkbox);
  li.appendChild(checkboxLabel);
  document.getElementById('taskList').appendChild(li);
  clearText();
  return true;
}

function handleAdd() {
  if (add() && window.innerWidth <= 744) {
    const element = document.getElementById('taskList').lastChild;
    const inputter = document.getElementsByClassName('task-inputter')[0];
    let top = window.getComputedStyle(inputter).top;
    top = parseInt(top, 10);
    if (top < 599) {
      if (element.scrollHeight == 20) {
        top += 20;
        inputter.style.top = top + 'px';
      } else if (element.scrollHeight == 59) {
        top += 59;
        inputter.style.top = top + 'px';
      } else {
        top += 39;
        inputter.style.top = top + 'px';
      }
    }
    if (top > 599) {
      inputter.style.top = 599 + 'px';
    }
  }
}

function clearText() {
  document.getElementById('taskInput').value = '';
}

function remove() {
  const checked = document.querySelectorAll('input[type=checkbox]:checked');
  for (const x of checked) {
    const parent = x.parentElement;
    parent.remove();
  }
}
//style="text-decoration: line-through;"
function cross() {
  const checked = document.querySelectorAll('input[type=checkbox]:checked');
  for (x of checked) {
    const parent = x.parentElement;
    parent.classList.toggle('crossed');
  }
}

function completed() {
  uncheck();
  const li = document.querySelectorAll('li');
  for (let x of li) {
    const style = getComputedStyle(x);
    if (style.textDecorationLine.includes('line-through')) {
      x.style.display = 'none';
    } else {
      x.style.display = 'block';
    }
  }
}

function incomplete() {
  uncheck();
  const li = document.querySelectorAll('li');
  for (let x of li) {
    const style = getComputedStyle(x);
    if (!style.textDecorationLine.includes('line-through')) {
      x.style.display = 'none';
    } else {
      x.style.display = 'block';
    }
  }
}

function All() {
  uncheck();
  const li = document.querySelectorAll('li');
  for (let x of li) {
    const style = getComputedStyle(x);
    if (style.display.includes('none')) {
      x.style.display = 'block';
    }
  }
}

function uncheck() {
  const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}
