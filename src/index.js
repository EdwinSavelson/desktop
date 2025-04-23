// target elements with the "draggable" class
interact('.draggable-resizable')
  .draggable({
    inertia: false,
    autoScroll: false,
    listeners: {
      move: dragMoveListener,
      end(event) {}
    }
  }).resizable({
    edges: { left: true, right: true, bottom: true, top: false },
    inertia: false,
    listeners: {
      move(event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        x += event.deltaRect.left
        y += event.deltaRect.top
        target.style.transform = 'translate(' + x + 'px,' + y + 'px)' 

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      },
    },
    modifiers: [
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
    ],
  })

function dragMoveListener(event) {
  var target = event.target
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

interact('.draggable')
  .draggable({
    inertia: false,
    autoScroll: false,
    listeners: {
      move: dragMoveListener,
      end(event) {}
    }
  })

window.dragMoveListener = dragMoveListener

var txtFile = "<h1>hi! my name is eddie</h1>";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("window-body1").innerHTML = txtFile;

  const terminal = document.getElementById('terminal-input');

  function updateCursor() {
    // Remove previous cursor
    const oldCursor = terminal.querySelector('.cursor-block');
    if (oldCursor) oldCursor.remove();

    // Get plain text
    const raw = terminal.innerText;

    // Update with text + fake cursor
    terminal.innerHTML = `${raw}<span class="cursor-block"></span>`;

    // Move caret to end
    const range = document.createRange();
    const sel = window.getSelection();
    const node = terminal.childNodes[0];
    if (node) {
      range.setStart(node, node.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  terminal.addEventListener('input', updateCursor);
  updateCursor();

  function fakeType(text, delay = 100, callback) {
    let i = 0;
  
    function typeNext() {
      if (i < text.length) {
        const terminal = document.getElementById('terminal-input');
        const current = terminal.innerText.replace(/\u200B/g, ''); // strip zero-width
        terminal.innerText = current + text[i];
        updateCursor();
        i++;
        setTimeout(typeNext, delay);
      } else if (callback) {
        callback();
      }
    }
  
    typeNext();
  }
  fakeType("~ hello, my name is eddie! \n~ welcome to my website!");

  function formatDateString(date = new Date()) {
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    };

    const datePart = date.toLocaleDateString('en-US', options);

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const timePart = `${hours}:${minutes} ${ampm}`;
    return `${datePart} ${timePart}`;
  }

  document.getElementById("date-time").textContent = formatDateString();
});
