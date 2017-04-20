function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomXY ($container, $fish) {
	let fishHeight = $fish.offsetHeight;
	let fishWidth = $fish.offsetWidth;

	let height = $container.offsetHeight;
	let width = $container.offsetWidth;

	let x = random(fishWidth * 1.1, width - 1.1 * fishWidth);
	let y = random(fishHeight * 1.1, height - 1.1 * fishHeight);

	return ({ x, y });
}

class Fish {
	constructor ($container, imgUrl) {
		this.image = document.createElement('img');
		this.fishHeight = random(20, 40);

		this.image.src = imgUrl;
		this.image.setAttribute('class', 'fish');
		this.image.setAttribute('style', 'height: ' + this.fishHeight + 'px;');
		$container.appendChild(this.image);

		this.randomPosition = randomXY($container, this.image);
		this.repositionFish();
	}

	feed (amount) {
		this.fishHeight += amount;
		this.repositionFish();
	}

	swim (x, y) {
		this.randomPosition = randomXY($container, this.image);
		this.repositionFish();
	}

	repositionFish () {
		this.image.setAttribute('style',
			' top: ' + this.randomPosition.y + 'px; left:' + this.randomPosition.x + 'px;' +
			' height: ' + this.fishHeight + 'px;');
	}
}

let $container = document.querySelector('.fish-area');
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
