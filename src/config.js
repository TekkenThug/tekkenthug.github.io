export default {
    /**
     * Попап
     * @property {object} modal - Работа модалок
     * @property {boolean} modal.isOpen - Открыт ли попап на странице
     * @property {function} modal.changeState - Меняет состояние модалки
     */
    // modal: {
    //     isOpen: false,
    //     changeState() {
    //         console.log(this)
    //         this.isOpen = !this.isOpen
    //     }
    // },

    /**
     *  Настройка юзера:
     *  @property {object} user - Юзер
     *  @property {string} user.avatar - Аватарка юзера
     *  @property {array} user.name - Имя юзера
     */
    user: {
        avatar: 'static/images/avatar.png',
        name: 'KMTT admin'
    },

    /**
     *  Настройка сайдбара:
     *  @property {object} sidebar - Конфиг сайдбара
     *
     *  @property {array} sidebar.menuContent - Содержание меню для сайдбара
     *  @property {string} sidebar.menuContent.title - Заголовок раздела (необязателен)
     *  @property {array} sidebar.menuContent.subtitles - Подзаголовоки разделов
     *
     *  @property {object} sidebar.userThumb - Миниатюра пользователя
     *  @property {array} sidebar.userThumb.options - Массив с ссылками
     *  @property {string} sidebar.userThumb.options.img - Путь до иконки
     *  @property {string} sidebar.userThumb.options.text - Текст в ссылке
     *  @property {function} sidebar.userThumb.options.action - Обработчик
     *
     *  @property {object} sidebar.componentBtn - Кнопка компонент
     *  @property {string} sidebar.componentBtn.icon - Иконка кнопки
     *  @property {string} sidebar.componentBtn.text - Текст кнопки
     *  @property {function} sidebar.componentBtn.action - Обработчик
     */
    sidebar: {
        menuContent: [
            {
                title: "Статистика",
                subtitles: ["Публикации", "Мессенджер"]
            },
            {
                subtitles: ["Подписка на еженедельную рассылку"]
            },
            {
                title: "Списки данных",
                subtitles: ["Доступные города", "Заблокированные пользователи", "Черный список ссылок", "Управление пользователями"]
            },
        ],
        userThumb: {
            options: [
                {
                    img: 'static/images/icons/settings.svg',
                    text: 'Основные настройки',
                    action: () => { console.log('settings') }
                },
                {
                    img: 'static/images/icons/menu.svg',
                    text: 'Настроить меню',
                    action: () => { console.log('menu') }
                },
                {
                    img: 'static/images/icons/alert-triangle.svg',
                    text: 'Сообщить о проблеме',
                    action: () => { console.log('problem') }
                }
            ]
        },
        componentBtn: {
            text: "Библиотека компонентов",
            icon: "static/images/icons/layers.svg",
            action: () => { console.log('library') }
        }
    },

    /**
     * Настройка панели списка пользователей
     * @property {object} controlUsers - Конфиг панели
     *
     * @property {object} controlUsers.page - Данные страницы
     * @property {string} controlUsers.page.title - Заголовок страницы
     * @property {string} controlUsers.page.subtitle - Подзаголовок страницы
     *
     * @property {object} controlUsers.tableData - Данные таблицы
     * @property {array} controlUsers.tableData.tableHeader - Заголовки таблиц
     * @property {array} controlUsers.tableData.users - Массив пользователей
     * @property {number} controlUsers.tableData.users.id - ID
     * @property {string} controlUsers.tableData.users.name - Имя
     * @property {string} controlUsers.tableData.users.email - Email
     * @property {string} controlUsers.tableData.users.status - Статус
     * @property {array} controlUsers.tableData.usersAction - Действия с пользователем
     * @property {string} controlUsers.tableData.usersAction.text - Подпись для действия
     *
     * @property {object} controlUsers.btn - Кнопка
     * @property {string} controlUsers.btn.title - Подпись
     * @property {function} controlUsers.btn.action - Действие по кнопке
     */
    controlUsers: {
        page: {
            title: "Списки данных",
            subtitle: "Управление пользователями"
        },
        subtitle: "Список пользователей",
        tableData: {
            tableHeaders: [
                {
                    path: "static/images/icons/list.svg",
                    text: "ID"
                },
                {
                    path: "static/images/icons/user.svg",
                    text: "Имя"
                },
                {
                    path: "static/images/icons/at-sign.svg",
                    text: "Email"
                },
                {
                    path: "static/images/icons/info.svg",
                    text: "Статус"
                },
                {
                    path: "static/images/icons/plus-circle.svg",
                    text: "Действия"
                }
            ],
            users: [
                {
                    id: 1,
                    name: 'Alex Stone',
                    email: 'alexstone.greatsoul@gmail.com',
                    status: '✅ Активен',
                },
                {
                    id: 2,
                    name: 'Alex Stone',
                    email: 'alexstone.greatsoul@gmail.com',
                    status: '✅ Активен',
                }
            ],
            usersAction: [
                {
                    text: 'Удалить',
                    action() { console.log('delete') }
                },
                {
                    text: 'Редактировать',
                    action: () => { console.log('edit') }
                },
                {
                    text: 'Забанить',
                    action: () => { console.log('ban') }
                }
            ],
        },
        btn: {
            text: "Добавить пользователя",
            action() { console.log('user add')}
        }
    }
}