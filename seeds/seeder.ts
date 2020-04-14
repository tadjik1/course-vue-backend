import { MikroORM } from 'mikro-orm';
import config from '../src/mikro-orm.config';
import { UserEntity } from '../src/users/user.entity';
import { MeetupEntity } from '../src/meetups/entities/meetup.entity';
import { AgendaItemEntity } from '../src/meetups/entities/agenda-item.entity';

async function getMikroOrmConnection() {
  console.log('[seeder] Connecting to DB');
  return MikroORM.init(config);
}

async function seeder() {
  console.log('[seeder] Seeding');
  const orm = await getMikroOrmConnection();

  const userGrigoriiK = new UserEntity({
    email: 'me@shgk.me',
    fullname: 'Grigorii K. Shartsev',
    password: 'qwerty',
  });
  const userIgorSh = new UserEntity({
    email: 'igor@email',
    fullname: 'Игорь Ш.',
    password: 'qwerty',
  });
  const userEugeneF = new UserEntity({
    email: 'eugeny@email',
    fullname: 'Eugeny F.',
    password: 'qwerty',
  });
  const users = [userGrigoriiK, userIgorSh, userEugeneF];
  orm.em.persist(users);

  const mskVueJsMeetup1 = new MeetupEntity({
    title: 'MSK VUE.JS MEETUP #1',
    description:
      'С каждым днем Vue.js становится популярней, все больше разработчиков и компаний делают ставку на данную технологию — 18 июля при поддержке компании Voximplant пройдет митап сообщества MSK VUE.JS, посвященный фреймворку. Спикеры поделятся опытом разработки, участники сообщества обсудят перспективы развития Vue.js.',
    date: new Date('2019-07-18').getTime(),
    place: 'Москва, офис Voximplant (ул. Мытная 66)',
    cover:
      'https://secure.meetupstatic.com/photos/event/7/4/2/600_468241858.jpeg',
  });
  mskVueJsMeetup1.organizer = userIgorSh;

  mskVueJsMeetup1.agenda.add(
    new AgendaItemEntity({
      startsAt: '18:30',
      endsAt: '19:00',
      type: 'registration',
    }),
    new AgendaItemEntity({
      startsAt: '19:00',
      endsAt: '19:45',
      type: 'talk',
      title: 'Vue.js 3 — все что ждет нас в будущем',
      description:
        'Скоро нас ждет Vue.js 3. Теперь наш любимый фреймворк станет лучше, быстрее, моднее. Давайте поговорим, что нового нас ждет, что мы получим и что потеряем в результате обновления. Рассмотрим технологии, которыми обогатится Vue.js и которые сделают его, на мой взгляд, самым быстрым и простым фреймворком на рынке.',
      speaker: 'Игорь Шеко — Lead Developer, Voximplant',
    }),
    new AgendaItemEntity({
      startsAt: '19:45',
      endsAt: '20:15',
      type: 'coffee',
    }),
    new AgendaItemEntity({
      startsAt: '20:15',
      endsAt: '21:00',
      type: 'talk',
      title: 'Опыт использования Vue.js в «Едадиле»',
      description:
        '— Долгая жизнь с Vue: промышленное использования начиная с версии 0.x.\n' +
        '— Vue внутри webview нативного приложения: подводные камни.\n' +
        '— Не «стандартный подход» к организации кода и сборке.\n' +
        '— Авто-оптимизация приложения Vue.\n' +
        '— Настоящая изоморфность: Vue и другой рантайм.',
      speaker:
        'Андрей Кобец — Руководитель отдела разработки фронтенда «Едадила», Яндекс',
    }),
    new AgendaItemEntity({
      startsAt: '21:00',
      endsAt: '21:45',
      type: 'talk',
      title: 'Прогрессивные приложения на прогрессивном фреймворке',
      description:
        'PWA (progressive web app, прогрессивное веб-приложение) — один из главных трендов в вебе последние 2 года. Наверняка, вы не раз о нем слышали и даже не раз делали. Или, как я, давно хотели попробовать, но на рабочих проектах в нем не было необходимости. Этот доклад для неслышавших или слышавших, но не пробовавших. Расскажу, что такое PWA, какие технологии подразумевает, в каких браузерах они работают, как интегрировать их во vue-приложение, чем тестировать и какие удобные готовые решения есть можно использовать.',
      speaker: 'Ольга Лесникова — Senior Developer, Voximplant',
    }),
    new AgendaItemEntity({
      startsAt: '22:00',
      endsAt: '22:00',
      type: 'closing',
    }),
  );

  const grigoriiKMeetup = new MeetupEntity({
    title: 'Мой митап',
    description: '',
    date: new Date('2019-07-19').getTime(),
    place: 'Пермь',
    cover: '',
  });
  grigoriiKMeetup.organizer = userGrigoriiK;

  const meetups = [mskVueJsMeetup1, grigoriiKMeetup];
  orm.em.persist(meetups);

  mskVueJsMeetup1.participants.add(userGrigoriiK);

  await orm.em.flush();
  await orm.close();
}

seeder()
  .then(() => {
    console.log('[seeder] Seed complete');
  })
  .catch((e) => {
    console.error(e);
  });
