function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomXY ($container) {
	let left = $container.offsetLeft;
	let top = $container.offsetTop;
	let width = left + $container.offsetWidth;
	let height = top + $container.offsetHeight;

	let x = random(left + 50, left + width - 100);
	let y = random(top + 20, top + height - 50);

	return ({ x, y });
}

class Fish {
	constructor ($container, imgUrl) {
		this.randomPosition = randomXY($container);
		this.image = document.createElement('img');
		this.fishHeight = random(20, 40);

		this.image.src = imgUrl;
		this.image.setAttribute('class', 'fish');
		this.repositionFish();

		$container.appendChild(this.image);
	}

	feed (amount) {
		this.fishHeight += amount;
		this.repositionFish();
	}

	swim (x, y) {
		this.randomPosition = randomXY($container);
		this.repositionFish();
	}

	repositionFish () {
		this.image.setAttribute('style',
			' top: ' + this.randomPosition.y + 'px; left:' + this.randomPosition.x + 'px;' +
			' height: ' + this.fishHeight + 'px;');
	}
}

let $container = document.querySelector('.water');
let $addButton = document.querySelector('#addFish');
let $feedButton = document.querySelector('#feedFish');
let $swimButton = document.querySelector('#swimFish');
let allFish = [];

$addButton.addEventListener('click', () => {
	let fish = new Fish($container, 'resources/images/orange-fish.png');

	allFish.push(fish);
});

$feedButton.addEventListener('click', () => {
		for (var fish of allFish) {
			fish.feed(random(10, 50));
		}
});

$swimButton.addEventListener('click', () => {
		for (var fish of allFish) {
			fish.swim();
		}
});
