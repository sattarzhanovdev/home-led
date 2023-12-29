function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function drawColorWheel(canvas, size = 150) {
  const context = canvas.getContext('2d');
  canvas.width = size;
  canvas.height = size;

  const centerColor = 'white';

  let angle = 0;
  const hexCode = [0, 0, 255];
  let pivotPointer = 0;
  const colorOffsetByDegree = 4.322;
  const radius = size / 2;

  while (angle < 360) {
    const pivotPointerbefore = (pivotPointer + 3 - 1) % 3;

    if (hexCode[pivotPointer] < 255) {
      hexCode[pivotPointer] =
        hexCode[pivotPointer] + colorOffsetByDegree > 255 ?
        255 :
        hexCode[pivotPointer] + colorOffsetByDegree;
    } else if (hexCode[pivotPointerbefore] > 0) {
      hexCode[pivotPointerbefore] =
        hexCode[pivotPointerbefore] > colorOffsetByDegree ?
        hexCode[pivotPointerbefore] - colorOffsetByDegree :
        0;
    } else if (hexCode[pivotPointer] >= 255) {
      hexCode[pivotPointer] = 255;
      pivotPointer = (pivotPointer + 1) % 3;
    }

    const rgb = `rgb(${hexCode.map(h => Math.floor(h)).join(',')})`;
    const grad = context.createRadialGradient(
      radius,
      radius,
      0,
      radius,
      radius,
      radius
    );
    grad.addColorStop(0, centerColor);
    grad.addColorStop(1, rgb);
    context.fillStyle = grad;

    context.globalCompositeOperation = 'source-over';
    context.beginPath();
    context.moveTo(radius, radius);
    context.arc(
      radius,
      radius,
      radius,
      degreesToRadians(angle),
      degreesToRadians(360)
    );
    context.closePath();
    context.fill();
    angle++;
  }
}

function getColorUnderMouse(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const pixel = context.getImageData(x, y, 1, 1).data;
  return `${pixel[0]}, ${pixel[1]}, ${pixel[2]}`;
}

function updateSelectedColor(event) {
  const selectedColorElement = document.getElementById('selectedColor');
  const color = getColorUnderMouse(event);
  selectedColorElement.textContent = 'Selected Color: ' + color;
}

const canvas = document.getElementById('canvas');

const context = canvas.getContext('2d');

drawColorWheel(canvas, 200);

canvas.addEventListener('mousemove', updateSelectedColor);
canvas.addEventListener('touchmove', updateSelectedColor);

let count = 0
fetch('https://631afc8ddc236c0b1ee91ae6.mockapi.io/api/v1/value/1').then(res => res.json)
  .then(res => {
    count = res.count
  })

canvas.addEventListener('click', function(event) {
  localStorage.setItem('color', getColorUnderMouse(event))

  const str = getColorUnderMouse(event).split(', ')

  fetch('https://631afc8ddc236c0b1ee91ae6.mockapi.io/api/v1/value/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'polka',
      r: Number(str[0]),
      g: Number(str[1]),
      b: Number(str[2]),
      count: count
    })
  }).then(() => {
    btn1.className = ''
    btn2.className = ''
    btn3.className = ''
    btn4.className = ''
    btn5.className = ''
  })

  updateSelectedColor(event);
});


const btn1 = document.querySelector('.btn1')
const btn2 = document.querySelector('.btn2')
const btn3 = document.querySelector('.btn3')
const btn4 = document.querySelector('.btn4')
const btn5 = document.querySelector('.btn5')

btn1.addEventListener('click', e => {
  e.preventDefault()

  fetch('https://631afc8ddc236c0b1ee91ae6.mockapi.io/api/v1/value/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'polka',
      r: 214,
      g: 77,
      b: 250,
      count: count
    })
  })
    .then(() => {
      btn1.className = 'active'
      btn2.className = ''
      btn3.className = ''
      btn4.className = ''
      btn5.className = ''
    })
})

btn2.addEventListener('click', e => {
  e.preventDefault()

  fetch('https://631afc8ddc236c0b1ee91ae6.mockapi.io/api/v1/value/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'polka',
      r: 103,
      g: 77,
      b: 250,
      count: count
    })
  })
    .then(() => {
      btn1.className = ''
      btn2.className = 'active'
      btn3.className = ''
      btn4.className = ''
      btn5.className = ''
    })
})

btn3.addEventListener('click', e => {
  e.preventDefault()

  fetch('https://631afc8ddc236c0b1ee91ae6.mockapi.io/api/v1/value/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'polka',
      r: 251,
      g: 46,
      b: 41,
      count: count
    })
  })
    .then(() => {
      btn1.className = ''
      btn2.className = ''
      btn3.className = 'active'
      btn4.className = ''
      btn5.className = ''
    })
})

btn4.addEventListener('click', e => {
  e.preventDefault()

  fetch('https://631afc8ddc236c0b1ee91ae6.mockapi.io/api/v1/value/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'polka',
      r: 45,
      g: 72,
      b: 249,
      count: count
    })
  })
    .then(() => {
      btn1.className = ''
      btn2.className = ''
      btn3.className = ''
      btn4.className = 'active'
      btn5.className = ''
    })
})

btn5.addEventListener('click', e => {
  e.preventDefault()

  fetch('https://631afc8ddc236c0b1ee91ae6.mockapi.io/api/v1/value/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'polka',
      r: 0,
      g: 249,
      b: 38,
      count: count
    })
  })
    .then(() => {
      btn1.className = ''
      btn2.className = ''
      btn3.className = ''
      btn4.className = ''
      btn5.className = 'active'
    })
})


const turnOff = document.querySelector('.turnOff');

turnOff.addEventListener('click', e => {
  e.preventDefault()

  fetch('https://631afc8ddc236c0b1ee91ae6.mockapi.io/api/v1/value/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'polka',
      r: 0,
      g: 0,
      b: 0
    })
  })
    .then(() => {
      btn1.className = ''
      btn2.className = ''
      btn3.className = ''
      btn4.className = ''
      btn5.className = ''
    })
})

const back = document.querySelector('.back')

back.addEventListener('click', e => {
  e.preventDefault()

  window.open('./index.html', '_self')
})

const first = document.querySelector('.first')
const second = document.querySelector('.second')
const third = document.querySelector('.third')
const all = document.querySelector('.all')


first.addEventListener('click', e => {
  e.preventDefault()

  fetch('https://631afc8ddc236c0b1ee91ae6.mockapi.io/api/v1/value/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      num: 1,
      from: 0,
      count: 39
    })
  })
})

second.addEventListener('click', e => {
  e.preventDefault()

  fetch('https://631afc8ddc236c0b1ee91ae6.mockapi.io/api/v1/value/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      num: 2,
      from: 39,
      count: 39+39
    })
  })
})

third.addEventListener('click', e => {
  e.preventDefault()

  fetch('https://631afc8ddc236c0b1ee91ae6.mockapi.io/api/v1/value/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      num: 3,
      from: 39+39,
      count: 39+39+39
    })
  })
})

all.addEventListener('click', e => {
  e.preventDefault()

  fetch('https://631afc8ddc236c0b1ee91ae6.mockapi.io/api/v1/value/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      num: 4,
      from: 0,
      count: 120
    })
  })
})