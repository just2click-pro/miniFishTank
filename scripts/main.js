var MiniFishTank = {};

MiniFishTank.random = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

MiniFishTank.randomXY = function ($container, $fish) {
	let fishHeight = $fish.offsetHeight;
	let fishWidth = $fish.offsetWidth;

	let height = $container.offsetHeight;
	let width = $container.offsetWidth;

	let x = MiniFishTank.random(fishWidth * 1.1, width - 1.1 * fishWidth);
	let y = MiniFishTank.random(fishHeight * 1.1, height - 1.1 * fishHeight);

	return ({ x, y });
}

class Fish {
	constructor ($container, imgUrl) {
		this.image = document.createElement('img');
		this.fishHeight = MiniFishTank.random(20, 40);

		this.image.src = imgUrl;
		this.image.setAttribute('class', 'fish');
		this.image.setAttribute('style', 'height: ' + this.fishHeight + 'px;');
		$container.appendChild(this.image);

		this.randomPosition = MiniFishTank.randomXY(MiniFishTank.$container, this.image);
		this.repositionFish();
	}

	feed (amount) {
		this.fishHeight += amount;
		this.repositionFish();
	}

	swim (x, y) {
		this.randomPosition = MiniFishTank.randomXY(MiniFishTank.$container, this.image);
		this.repositionFish();
	}

	repositionFish () {
		this.image.setAttribute('style',
			' top: ' + this.randomPosition.y + 'px; left:' + this.randomPosition.x + 'px;' +
			' height: ' + this.fishHeight + 'px;');
	}
}

MiniFishTank.$container = document.querySelector('.fish-area');
MiniFishTank.$addButton = document.querySelector('#addFish');
MiniFishTank.$feedButton = document.querySelector('#feedFish');
MiniFishTank.$swimButton = document.querySelector('#swimFish');
MiniFishTank.allFish = [];

MiniFishTank.$addButton.addEventListener('click', () => {
	let fish = new Fish(MiniFishTank.$container, 'resources/images/orange-fish.png');

	MiniFishTank.allFish.push(fish);
});

MiniFishTank.$feedButton.addEventListener('click', () => {
		for (var fish of MiniFishTank.allFish) {
			fish.feed(MiniFishTank.random(10, 50));
		}
});

MiniFishTank.$swimButton.addEventListener('click', () => {
		for (var fish of MiniFishTank.allFish) {
			fish.swim();
		}
});
