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

let mainArr = [
    // Создание палки
    [
        [0, 1],
        [0, 2],
        [0, 3],
        // Поворот на 90 градусов
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2]
        ],
        // Поворот на 180 градусов
        [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2]
        ],
        // Поворот на 270 градусов
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2]
        ],
        // Поворот на 360 градусов
        [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2]
        ]
    ],
    // Создание квадрата
    [
        [1, 0],
        [0, 1],
        [1, 1],
        // Поворот на 90 градусов
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        // Поворот на 180 градусов
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        // Поворот на 270 градусов
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        // Поворот на 360 градусов
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ]
    ],
    // Создание L
    [
        [1, 0],
        [0, 1],
        [0, 2],
        // Поворот на 90 градусов
        [
            [0, 0],
            [-1, 1],
            [1, 0],
            [2, -1]
        ],
        // Поворот на 180 градусов
        [
            [1, -1],
            [1, -1],
            [-1, 0],
            [-1, 0]
        ],
        // Поворот на 270 градусов
        [
            [-1, 0],
            [0, -1],
            [2, -2],
            [1, -1]
        ],
        // Поворот на 360 градусов
        [
            [0, -1],
            [0, -1],
            [-2, 0],
            [-2, 0]
        ]
    ],
    // Обратный L
    [
        [1, 0],
        [1, 1],
        [1, 2],
        // Поворот на 90 градусов
        [
            [0, 0],
            [0, 0],
            [1, -1],
            [-1, -1]
        ],
        // Поворот на 180 градусов
        [
            [0, 0],
            [-1, 1],
            [-2, 2],
            [1, 1]
        ],
        // Поворот на 270 градусов
        [
            [2, 0],
            [0, 0],
            [1, -1],
            [1, -1]
        ],
        // Поворот на 360 градусов
        [
            [-2, 0],
            [1, -1],
            [0, 0],
            [-1, 1]
        ]
    ],
    // Танчик
    [
        [1, 0],
        [2, 0],
        [1, 1],
        // Поворот на 90 градусов
        [
            [1, 0],
            [0, 1],
            [0, 1],
            [0, 1]
        ],
        // Поворот на 180 градусов
        [
            [0, 0],
            [-1, 0],
            [-1, 0],
            [1, -1]
        ],
        // Поворот на 270 градусов
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [-1, 1]
        ],
        // Поворот на 360 градусов
        [
            [-1, 0],
            [1, -1],
            [1, -1],
            [0, -1]
        ]
    ],
    // Зигзаг
    [
        [1, 0],
        [-1, 1],
        [0, 1],
        // Поворот на 90 градусов
        [
            [-1, 0],
            [-2, 1],
            [1, 0],
            [0, 1]
        ],
        // Поворот на 180 градусов
        [
            [1, 0],
            [2, -1],
            [-1, 0],
            [0, -1]
        ],
        // Поворот на 270 градусов
        [
            [-1, 0],
            [-2, 1],
            [1, 0],
            [0, 1]
        ],
        // Поворот на 360 градусов
        [
            [1, 0],
            [2, -1],
            [-1, 0],
            [0, -1]
        ]
    ],
    // Обратный зигзаг
    [
        [1, 0],
        [1, 1],
        [2, 1],
        // Поворот на 90 градусов
        [
            [1, 0],
            [-1, 1],
            [0, 0],
            [-2, 1]
        ],
        // Поворот на 180 градусов
        [
            [-1, 0],
            [1, -1],
            [0, 0],
            [2, -1]
        ],
        // Поворот на 270 градусов
        [
            [1, 0],
            [-1, 1],
            [0, 0],
            [-2, 1]
        ],
        // Поворот на 360 градусов
        [
            [-1, 0],
            [1, -1],
            [0, 0],
            [2, -1]
        ]
    ]
];

let figureBody = 0;
let currentFigure = 0;
let rotate = 1;

function create() {
    function getRandom() {
        return Math.round(Math.random() * (mainArr.length - 1));
    }

    rotate = 1;
    currentFigure = getRandom();

    figureBody = [
        document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`)
    ]

    for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.add('figure');
    }
}

create();


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
            figureBody[i].classList.remove('figure');
        };

        // Затем создаем новый массив элементов, где по оси Y отнимаем единицу и снова присваиваем класс figure

        figureBody = [
            document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
            document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
            document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
            document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`)
        ];

        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('figure');
        }
    } else {

        // Если moveFlag == false, то убираем у элемента класс figure и присваиваем класс set

        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove('figure');
            figureBody[i].classList.add('set');
        }

        // После создаем новый элемент

        create();
    }
}

    // Создаем движение с интервалом

let interval = setInterval(() => {
    move();
}, 300)

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
                figureBody[i].classList.remove('figure');
            };

            figureBody = figureNew;

            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.add('figure');
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
                figureBody[i].classList.remove('figure');
            };

            figureBody = figureNew;

            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            };

            if (rotate < 4) {
                rotate++;
            } else {
                rotate = 1;
            }
        }
    }
});