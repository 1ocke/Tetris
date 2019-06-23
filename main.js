// Hey everyone
// Создаем модальное окно начала игры и скорость падения фигур.

let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.modal');
let speed = 0;

// Назначаем события при клике на уровни сложности

modal.addEventListener('click', function (e) {
    if (e.target.classList.contains('easy')) {
        speed = 1000;
    } else if (e.target.classList.contains('normal')) {
        speed = 500;
    } else if (e.target.classList.contains('hard')) {
        speed = 300;
    }

// При нажатии на кнопку, скрываем модальные окна и игра начинается

    if (e.target.classList.contains('button')) {
        modal.style.display = 'none';
        overlay.style.display = 'none';

        startGame();
    }
});

function startGame() {

    let tetris = document.createElement('div');
    tetris.classList.add('tetris');

    for (let i = 1; i < 181; i++) {
        let excel = document.createElement('div');
        excel.classList.add('excel');
        tetris.appendChild(excel);
    }

    let main = document.getElementsByClassName('main')[0];
    main.appendChild(tetris);

    let excel = document.getElementsByClassName('excel');
    let i = 0;

    for (let y = 18; y > 0; y--) {
        for (let x = 1; x < 11; x++) {
            excel[i].setAttribute('posX', x);
            excel[i].setAttribute('posY', y);
            i++;
        }
    }
    // Место респауна фигуры
    let x = 5,
        y = 15;

    let mainArr = [[[0, 1], [0, 2], [0, 3], [[-1, 1], [0, 0], [1, -1], [2, -2]], [[1, -1], [0, 0], [-1, 1], [-2, 2]], [[-1, 1], [0, 0], [1, -1], [2, -2]], [[1, -1], [0, 0], [-1, 1], [-2, 2]]], [[1, 0], [0, 1], [1, 1], [[0, 0], [0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0], [0, 0]]], [[1, 0], [0, 1], [0, 2], [[0, 0], [-1, 1], [1, 0], [2, -1]], [[1, -1], [1, -1], [-1, 0], [-1, 0]], [[-1, 0], [0, -1], [2, -2], [1, -1]], [[0, -1], [0, -1], [-2, 0], [-2, 0]]], [[1, 0], [1, 1], [1, 2], [[0, 0], [0, 0], [1, -1], [-1, -1]], [[0, 0], [-1, 1], [-2, 2], [1, 1]], [[2, 0], [0, 0], [1, -1], [1, -1]], [[-2, 0], [1, -1], [0, 0], [-1, 1]]], [[1, 0], [2, 0], [1, 1], [[1, 0], [0, 1], [0, 1], [0, 1]], [[0, 0], [-1, 0], [-1, 0], [1, -1]], [[0, 0], [0, 0], [0, 0], [-1, 1]], [[-1, 0], [1, -1], [1, -1], [0, -1]]], [[1, 0], [-1, 1], [0, 1], [[-1, 0], [-2, 1], [1, 0], [0, 1]], [[1, 0], [2, -1], [-1, 0], [0, -1]], [[-1, 0], [-2, 1], [1, 0], [0, 1]], [[1, 0], [2, -1], [-1, 0], [0, -1]]], [[1, 0], [1, 1], [2, 1], [[1, 0], [-1, 1], [0, 0], [-2, 1]], [[-1, 0], [1, -1], [0, 0], [2, -1]], [[1, 0], [-1, 1], [0, 0], [-2, 1]], [[-1, 0], [1, -1], [0, 0], [2, -1]]]];

    let colors = [
        "color1", "color2", "color3", "color4", "color5", "color6", "color7", "color8"
    ];

    let figureBody = 0;
    let currentFigure = 0;
    let currentColor = 0;
    let rotate = 1;

    function create() {
        function getRandom() {
            return Math.round(Math.random() * (mainArr.length - 1));
        }

        function randomColor() {
            return Math.round(Math.random() * (colors.length - 1));
        }

        rotate = 1;
        currentFigure = getRandom();
        currentColor = randomColor();

        figureBody = [
            document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
            document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
            document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
            document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`)
        ]

        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('figure', colors[currentColor]);
        }
    }

    create();

    let score = 0;
    let input = document.getElementsByTagName('input')[0];
    input.value = `Ваши очки: ${score}`;


    function move() {
        // Если moveFlag равен true, то фигура будет двигаться до упора(когда moveFlag будет равен false), после чего она закрепится у края и будет создана новая фигура
        let moveFlag = true;

        // Находим координаты всех элементов фигуры.
        let coordinates = [
            [figureBody[0].getAttribute('PosX'), figureBody[0].getAttribute('PosY')],
            [figureBody[1].getAttribute('PosX'), figureBody[1].getAttribute('PosY')],
            [figureBody[2].getAttribute('PosX'), figureBody[2].getAttribute('PosY')],
            [figureBody[3].getAttribute('PosX'), figureBody[3].getAttribute('PosY')]
        ];

        // Перебираем массив и проверяем: если один из элементов по оси Y равен 1, то движение прекращаем И если ниже установленного элемента есть элемент с классом Set, то тоже останавливаем движение фигуры

        for (let i = 0; i < coordinates.length; i++) {
            if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] - 1}"]`).classList.contains('set')) {
                moveFlag = false;
                break;
            }
        };

        // Если moveFlag == true, отнимаем у элемента класс figure

        if (moveFlag) {
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure', colors[currentColor]);
            };

            // Затем создаем новый массив элементов, где по оси Y отнимаем единицу и снова присваиваем класс figure

            figureBody = [
                document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`)
            ];

            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.add('figure', colors[currentColor]);
            }
        } else {

            // Если moveFlag == false, то убираем у элемента класс figure и присваиваем класс set

            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure', colors[currentColor]);
                figureBody[i].classList.add('set', colors[currentColor]);
            }

            for (let i = 1; i < 15; i++) {
                let count = 0;

                for (let k = 1; k < 11; k++) {
                    if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')) {
                        count++
                        if (count == 10) {
                            score += 10;
                            input.value = `Ваши очки: ${score}`;
                            for (let m = 1; m < 11; m++) {
                                document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set', "color1", "color2", "color3", "color4", "color5", "color6", "color7", "color8");
                            }

                            let set = document.querySelectorAll('.set');
                            let newSet = [];
                            for (let s = 0; s < set.length; s++) {
                                let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')]
                                if (setCoordinates[1] > i) {
                                    set[s].classList.remove('set', "color1", "color2", "color3", "color4", "color5", "color6", "color7", "color8");
                                    newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1] - 1}"]`));
                                }
                            }

                            for (let a = 0; a < newSet.length; a++) {
                                newSet[a].classList.add('set', colors[currentColor]);
                            }

                            i--;
                        }
                    }
                }
            }

            // Прерывание игры, когда какая-нибудь из фигур дойдет до верхнего края игрового поля. Проходим циклом по оси Х по 15 ряду(последнему), ищем элемент который содержит класс set, после чего появляется alert об окончании игры, и цикл прерывается.

            for (let n = 1; n < 11; n++) {
                if (document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')) {
                    clearInterval(interval);
                    alert(`Игра окончена. Ваши очки: ${score}`);
                    break;
                }
            }

            // После создаем новый элемент

            create();
        }
    }

    // Создаем движение с интервалом

    let interval = setInterval(() => {
        move();
    }, speed)

    let flag = true;

    // Создаем функцию, отвечающую за движение. 

    window.addEventListener('keydown', function (e) {

        // Добавляем каждый элемент фигуры в переменную
        let coordinate1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
        let coordinate2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
        let coordinate3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
        let coordinate4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

        // Функция новый координат

        function getNewState(a) {

            flag = true;

            // Массив с элементами, где по оси Х мы добавляем параметр 'a', который может быть единицей при нажатии клавиши вправо и минус единицей при нажатии клавиши влево

            figureNew = [
                document.querySelector(`[posX = "${+coordinate1[0] + a}"][posY = "${coordinate1[1]}"]`),
                document.querySelector(`[posX = "${+coordinate2[0] + a}"][posY = "${coordinate2[1]}"]`),
                document.querySelector(`[posX = "${+coordinate3[0] + a}"][posY = "${coordinate3[1]}"]`),
                document.querySelector(`[posX = "${+coordinate4[0] + a}"][posY = "${coordinate4[1]}"]`)
            ];

            // Перебираем наш новый массив и ЕСЛИ квадрата с данными параметрами не существует ИИ если новый элемент содержит класс set, то движение по клавишам не происходит

            for (let i = 0; i < figureNew.length; i++) {
                if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                    flag = false;
                }
            };

            // Если движение возможно, то убираем у элемента класс figure, делаем элемент новым элементом(с новыми координатами) и присваем ему класс figure

            if (flag) {
                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove('figure', colors[currentColor]);
                };

                figureBody = figureNew;

                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.add('figure', colors[currentColor]);
                };
            }
        };

        // Логика движения: если влево, то аргумент а = -1, если вправо, то а = 1. Если вниз, то визуальное ускорение.

        if (e.keyCode == 37) {
            getNewState(-1);
        } else if (e.keyCode == 39) {
            getNewState(1);
        } else if (e.keyCode == 40) {
            move();
        } else if (e.keyCode == 38) {
            flag = true;

            figureNew = [

                document.querySelector(`[posX = "${+coordinate1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${+coordinate1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),
                document.querySelector(`[posX = "${+coordinate2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${+coordinate2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),
                document.querySelector(`[posX = "${+coordinate3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${+coordinate3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),
                document.querySelector(`[posX = "${+coordinate4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${+coordinate4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`)
            ];

            for (let i = 0; i < figureNew.length; i++) {
                if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                    flag = false;
                }
            };

            if (flag) {
                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove('figure', colors[currentColor]);
                };

                figureBody = figureNew;

                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.add('figure', colors[currentColor]);
                };

                if (rotate < 4) {
                    rotate++;
                } else {
                    rotate = 1;
                }
            }
        }
    });
};