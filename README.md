<div style="text-align: center">
    <h1>Booking Crimea Server Side</h1>
    <p>
        Серверная часть проекта, предоставляющая API для бронирования различных 
        средств размещения для отдыха в Крыму. Наш сервис обеспечивает клиентов
        возможностью взаимодейтсвия с базой данных объектов и управления бронированием.
    </p>
</div>

<h2 style="text-align: center">Установка</h2>

<h3>Предварительные требования</h3>
<p>Перед началом работы убедитесь, что у вас установлены следующие компоненты:</p>
<ol>
    <li><a href="https://nodejs.org/">Node.js</a> - рекомедуемая версия 14.x и выше</li>
    <li><a href="https://www.npmjs.com/">npm</a></li>
    <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
</ol>

<h3>Шаги по установке</h3>
<ol>
    <li>Клонируйте репозиторий на ваш локальный компьютер:</li>
    <code>git clone https://github.com/Tyman3413/booking-crimea-server-side.git</code>
    <li>Установите зависимости:</li>
    <code>npm install</code>
    <li>Создайте файл .env в корневом каталоге проекта и добавьте в него переменные на основе env.template</li>
    <li>Создайте базу данных PostgreSQL с именем, указанным в переменной DATABASE_NAME</li>
    <li>Запустите миграции для настройки базы данных:</li>
    <code>npm run migration:run</code>
</ol>

<h2 style="text-align: center">Запуск проекта</h2>
<p>Для запуска сервера в режиме разработки используйте команду:</p>
<code>npm run start:dev</code>
<p>Сервер будет запущен на http://localhost:8080.</p>

<h2 style="text-align: center">Документация API</h2>
<p>После запуска сервера документация API будет доступна по адресу http://localhost:8080/api.</p>
