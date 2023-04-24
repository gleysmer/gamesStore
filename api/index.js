//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Gender, Platform } = require('./src/db.js');

const initiateTables = async () => {
  let genders = [
    {gender:'sports'}, 
    {gender:'adventure'}, 
    {gender:'horror'}, 
    {gender:'race'}, 
    {gender:'rpg'}, 
    {gender:'multiplayer'}, 
    {gender:'strategy'},
    {gender:'arcade'},
    {gender:'simulation'},
    {gender:'board games'},
    {gender: 'destacados'},
    {gender:'action'},
    {gender: 'fight'}

  ];
  
  for(let index in genders){
    // console.log(genders[index].gender);
    await Gender.findOrCreate(
        {
            where: {
                gender: genders[index].gender
            }
        }
    )
  }
  
  let platforms = [
    {name:'PS4', logo:'https://i.pinimg.com/originals/18/1e/fd/181efd4992e7d117710fff5b82c4ad78.jpg'}, 
    {name:'PS5', logo:'https://images.pushsquare.com/7eb5640f6f42e/ps5-playstation-5-sony-1.large.jpg'},
    {name:'XBOX ONE X', logo:'https://news.microsoft.com/wp-content/uploads/prod/sites/41/2017/06/Xbox-One-X_2017_Stacked.png'},
    {name: 'PC', logo:'https://st4.depositphotos.com/27847728/39420/v/600/depositphotos_394204744-stock-illustration-initial-pc-letter-logo-with.jpg'},
    {name: 'NINTENDO SWITCH', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Nintendo_Switch_logo%2C_square.png/768px-Nintendo_Switch_logo%2C_square.png'},
    {name: 'NINTENDO WII', logo:"https://cdn.mos.cms.futurecdn.net/NmqpY2dduBuVtW5kPzdyyZ.jpg"}
    
  ];
  
  for(let index in platforms){
    // console.log(platforms[index].name);
    await Platform.findOrCreate(
        {
            where: {
                name: platforms[index].name,
                logo: platforms[index].logo
            }
        }
    )
  }
}

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  initiateTables();

  // server.use(express.static('public'));

  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

// comentario



