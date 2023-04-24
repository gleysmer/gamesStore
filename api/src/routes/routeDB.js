const { Router } = require("express");
const { Gender, Platform, Product } = require("../db.js");
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// esta ruta sirve para crear los productos en cualquier momento
router.post("/db", async (req, res) => {
  
    let juegos = [
      {
        id: 8,
        name: "F1",
        description:
          "Videojuego oficial del Campeonato Mundial de Fórmula Uno de la FIA™ de 2022. Toma asiento para la nueva temporada donde autos y reglas rediseñadas redefinen el día de la carrera; pon a prueba tus habilidades en el Autódromo Internacional de Miami y degusta la pompa y el glamur en F1® Life.",
        price: "20",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678678797/posters/ureu0ic4k3u0wjovqon6.webp",
        stock: 300,
        year: 2022,
        enabled: true,
        genders: [
          {
            gender: "simulation",
          },
        ],
        platforms: [
          {
            name: "PS5",
            logo: "https://images.pushsquare.com/7eb5640f6f42e/ps5-playstation-5-sony-1.large.jpg",
          },
        ],
        reviews: [],
      },
      {
        id: 20,
        name: "WAREHOUSE",
        description:
          "Maneja equipos especializados usados en almacenes y conviértete en un profesional en tu campo. El proyecto es una completa plataforma de formación para conductores de carretillas elevadoras. Y la mecánica bien desarrollada del movimiento del equipo de almacén especializado le permite experimentar las sensaciones de trabajar en un almacén sin salir de su computadora.",
        price: "8",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678680096/posters/lmlqlhzxoh2cmx6ehloi.jpg",
        stock: 8,
        year: 2010,
        enabled: true,
        genders: [
          {
            gender: "simulation",
          },
        ],
        platforms: [
          {
            name: "PC",
            logo: "https://st4.depositphotos.com/27847728/39420/v/600/depositphotos_394204744-stock-illustration-initial-pc-letter-logo-with.jpg",
          },
        ],
        reviews: [],
      },
      {
        id: 11,
        name: "KINGHTS OF BRAVE",
        description:
          "Join the Heroes Guild and travel the path from a rookie to the hero of the kingdom. Head on a hunt for the vicious boss solo or with your friends. Your adventure will be randomly generated from hundreds of different events. Once you sign up a contract to catch the villain, you’ll head into an adventure. Each quest is created from hundreds of particular events, melding into a unique story. The Elves will reveal secret paths to you and the ordinary pub owner might very well turn out to be a werewolf.",
        price: "100",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678679128/posters/i6jq7dqdplootqcawy9l.webp",
        stock: 52,
        year: 2018,
        enabled: true,
        genders: [
          {
            gender: "adventure",
          },
        ],
        platforms: [
          {
            name: "PC",
            logo: "https://st4.depositphotos.com/27847728/39420/v/600/depositphotos_394204744-stock-illustration-initial-pc-letter-logo-with.jpg",
          },
        ],
        reviews: [],
      },
      {
        id: 17,
        name: "SUPER MARIO 3",
        description:
          "Descubre la singular precuela de la obra maestra aclamada por la crítica NieR: Automata. Ahora con una mejora moderna, experimentarás gráficos reavivados con maestría, una historia fascinante y más.",
        price: "23",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678679877/posters/xr2xnmi4xiwl2gsugukx.webp",
        stock: 10,
        year: 2020,
        enabled: true,
        genders: [
          {
            gender: "arcade",
          },
        ],
        platforms: [
          {
            name: "NINTENDO SWITCH",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Nintendo_Switch_logo%2C_square.png/768px-Nintendo_Switch_logo%2C_square.png",
          },
        ],
        reviews: [],
      },
      {
        id: 12,
        name: "NBA 2K13",
        description:
          "Ponte a prueba contra los mejores jugadores del mundo y demuestra tu talento en Mi CARRERA o The W. Une a las estrellas actuales con leyendas eternas en MyTEAM. Construye tu propia dinastía como GM, o dirige la liga en una nueva dirección como Comisionado en Mi NBA. Enfréntate a equipos de la NBA o de la WNBA en JUGAR AHORA y experimenta un juego realista. ¿Cómo Responderás a La Llamada?",
        price: "100",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678679255/posters/b4cgjevfubfgevfxgz81.jpg",
        stock: 52,
        year: 2023,
        enabled: true,
        genders: [
          {
            gender: "sports",
          },
        ],
        platforms: [
          {
            name: "PS5",
            logo: "https://images.pushsquare.com/7eb5640f6f42e/ps5-playstation-5-sony-1.large.jpg",
          },
        ],
        reviews: [],
      },
      {
        id: 10,
        name: "HOGWARTS",
        description:
          "Hogwarts Legacy es un RPG de acción envolvente y de mundo abierto dentro del mundo presentado por primera vez en los libros de Harry Potter.",
        price: "20",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678678970/posters/zjltcgqdxvxnd6g5glmi.webp",
        stock: 302,
        year: 2023,
        enabled: true,
        genders: [
          {
            gender: "adventure",
          },
        ],
        platforms: [
          {
            name: "PS5",
            logo: "https://images.pushsquare.com/7eb5640f6f42e/ps5-playstation-5-sony-1.large.jpg",
          },
        ],
        reviews: [],
      },
      {
        id: 18,
        name: "TRAIL UOT",
        description:
          "¡Bienvenidos al festival de las carreras explosivas, TRAIL OUT! ¡Te espera una carrera loca en diferentes partes del mundo, tu objetivo principal es vivir hasta la línea de meta y llevarte la copa principal del festival! Autos que explotan, conductores que vuelan y gritan,",
        price: "23",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678679956/posters/hfaa0zorkshljjxih1g6.jpg",
        stock: 5,
        year: 2018,
        enabled: true,
        genders: [
          {
            gender: "race",
          },
        ],
        platforms: [
          {
            name: "PC",
            logo: "https://st4.depositphotos.com/27847728/39420/v/600/depositphotos_394204744-stock-illustration-initial-pc-letter-logo-with.jpg",
          },
        ],
        reviews: [],
      },
      {
        id: 2,
        name: "THE LAST OF US",
        description:
          "The Last of Us es un videojuego de terror, acción y aventura desarrollado por la compañía estadounidense Naughty Dog y distribuido por Sony Computer Entertainment para la consola PlayStation 3 en 2013. La trama describe las vivencias de Joel y Ellie, un par de supervivientes de una pandemia en Estados Unidos que provoca la mutación de los seres humanos en criaturas caníbales.\r\nSu desarrollo comenzó en 2009, poco después del lanzamiento del anterior juego de Naughty Dog, Uncharted 2: El reino de los ladrones y recayó en Bruce Straley y Neil Druckmann.1​ Uno de los aspectos centrales de la narrativa del juego viene dado por el vínculo entre sus protagonistas",
        price: "20",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678677910/posters/uuwg29qftpqd5iqgwzl5.jpg",
        stock: 20,
        year: 2023,
        enabled: true,
        genders: [
          {
            gender: "horror",
          },
        ],
        platforms: [
          {
            name: "PC",
            logo: "https://st4.depositphotos.com/27847728/39420/v/600/depositphotos_394204744-stock-illustration-initial-pc-letter-logo-with.jpg",
          },
        ],
        reviews: [],
      },
      {
        id: 6,
        name: "DIABLO 3",
        description:
          "Hace eones, los ángeles y los demonios engendraron tu mundo en una unión prohibida. Ahora han venido a reclamarlo.",
        price: "20",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678678641/posters/svhnu7lajvxszjwky0bv.jpg",
        stock: 100,
        year: 2020,
        enabled: true,
        genders: [
          {
            gender: "rpg",
          },
        ],
        platforms: [
          {
            name: "PS4",
            logo: "https://i.pinimg.com/originals/18/1e/fd/181efd4992e7d117710fff5b82c4ad78.jpg",
          },
        ],
        reviews: [],
      },
      {
        id: 16,
        name: "SCRAPPAGE",
        description:
          "En un futuro no muy lejano, la humanidad finalmente cruzó el borde del abismo: el mundo yace en ruinas, los pocos sobrevivientes no solo luchan entre sí, sino que también tienen que lidiar con las innumerables criaturas nuevas que arrasan las tierras baldías.",
        price: "10",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678679634/posters/s67v6drqfldelbcra4dc.jpg",
        stock: 10,
        year: 2007,
        enabled: true,
        genders: [
          {
            gender: "simulation",
          },
        ],
        platforms: [
          {
            name: "PC",
            logo: "https://st4.depositphotos.com/27847728/39420/v/600/depositphotos_394204744-stock-illustration-initial-pc-letter-logo-with.jpg",
          },
        ],
        reviews: [],
      },
      {
        id: 4,
        name: "Crahs Ctr",
        description:
          " ¡Crash vuelve al volante! Prepárate para pisar a fondo el acelerador con Crash Team Racing Nitro-Fueled. Es la experiencia auténtica de CTR y mucho más; completamente remasterizada y a tope de revoluciones.",
        price: "23",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678678489/posters/gdkxjtmlos1j5danzjoa.webp",
        stock: 155,
        year: 2012,
        enabled: true,
        genders: [
          {
            gender: "race",
          },
        ],
        platforms: [
          {
            name: "NINTENDO SWITCH",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Nintendo_Switch_logo%2C_square.png/768px-Nintendo_Switch_logo%2C_square.png",
          },
        ],
        reviews: [],
      },
      {
        id: 15,
        name: "RESINDENT EVIL",
        description:
          "ReCore es un videojuego de acción creado por Keiji Inafune en exclusiva Microsoft (Ahora también en steam) para PC (Windows 7, 8.1 y 10) y Xbox One. La aventura pone al jugador en el rol de uno de los los últimos seres humanos de un planeta controlado por enemigos robóticos con el único objetivo de destruirle",
        price: "30",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678679527/posters/d4bqfjdfmviigqy4ndkv.webp",
        stock: 10,
        year: 2005,
        enabled: true,
        genders: [
          {
            gender: "action",
          },
        ],
        platforms: [
          {
            name: "NINTENDO WII",
            logo: "https://cdn.mos.cms.futurecdn.net/NmqpY2dduBuVtW5kPzdyyZ.jpg",
          },
        ],
        reviews: [],
      },
      {
        id: 22,
        name: "ZELDA",
        description:
          "World War Z: Aftermath es el shooter cooperativo de zombis definitivo basado en el taquillazo de Paramount Pictures y el siguiente paso de World War Z, el éxito que ha cautivado a más de 20 millones de jugadores",
        price: "26",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678680224/posters/n4mttvrmepmyoozi2fsx.jpg",
        stock: 5,
        year: 2023,
        enabled: true,
        genders: [
          {
            gender: "adventure",
          },
        ],
        platforms: [
          {
            name: "NINTENDO SWITCH",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Nintendo_Switch_logo%2C_square.png/768px-Nintendo_Switch_logo%2C_square.png",
          },
        ],
        reviews: [],
      },
      {
        id: 13,
        name: "NIER-REPLICANT",
        description:
          "Descubre la singular precuela de la obra maestra aclamada por la crítica NieR: Automata. Ahora con una mejora moderna, experimentarás gráficos reavivados con maestría, una historia fascinante y más.",
        price: "50",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678679334/posters/xzqc43bqwsi2fqwn52u5.webp",
        stock: 26,
        year: 2020,
        enabled: true,
        genders: [
          {
            gender: "strategy",
          },
        ],
        platforms: [
          {
            name: "PS4",
            logo: "https://i.pinimg.com/originals/18/1e/fd/181efd4992e7d117710fff5b82c4ad78.jpg",
          },
        ],
        reviews: [],
      },
      {
        id: 5,
        name: "DEATH TRIALS DIRE",
        description:
          " ¡Crash vuelve al volante! Prepárate para pisar a fondo el acelerador con Crash Team Racing Nitro-Fueled. Es la experiencia auténtica de CTR y mucho más; completamente remasterizada y a tope de revoluciones.",
        price: "20",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678678552/posters/jhrm6wgc9lz42zt0kfbq.jpg",
        stock: 16,
        year: 2016,
        enabled: true,
        genders: [
          {
            gender: "horror",
          },
        ],
        platforms: [
          {
            name: "PC",
            logo: "https://st4.depositphotos.com/27847728/39420/v/600/depositphotos_394204744-stock-illustration-initial-pc-letter-logo-with.jpg",
          },
        ],
        reviews: [],
      },
      {
        id: 21,
        name: "WORLD WAR Z",
        description:
          "World War Z: Aftermath es el shooter cooperativo de zombis definitivo basado en el taquillazo de Paramount Pictures y el siguiente paso de World War Z, el éxito que ha cautivado a más de 20 millones de jugadores",
        price: "10",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678680155/posters/addyc6gbgfxduqkryn7d.jpg",
        stock: 5,
        year: 2015,
        enabled: true,
        genders: [
          {
            gender: "horror",
          },
        ],
        platforms: [
          {
            name: "PC",
            logo: "https://st4.depositphotos.com/27847728/39420/v/600/depositphotos_394204744-stock-illustration-initial-pc-letter-logo-with.jpg",
          },
        ],
        reviews: [],
      },
      {
        id: 3,
        name: "CARS",
        description:
          " Videojuego basado en la película producida por Walt Disney Pictures Pixar y lanzada por Walt Disney Studios Motion Pictures. Publicado para la Consola Nintendo Gamecube",
        price: "50",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678678326/posters/zsbwdalfbcyjvnnqez83.webp",
        stock: 10,
        year: 2000,
        enabled: true,
        genders: [
          {
            gender: "race",
          },
        ],
        platforms: [
          {
            name: "PC",
            logo: "https://st4.depositphotos.com/27847728/39420/v/600/depositphotos_394204744-stock-illustration-initial-pc-letter-logo-with.jpg",
          },
        ],
        reviews: [],
      },
      {
        id: 19,
        name: "UFC 4 ",
        description:
          "En EA SPORTS UFC 4, tu progreso como combatiente se define por tus logros, tu personalidad y tu estilo de combate. Juega cómo y dónde quieras. Con EA SPORTS UFC 4 serás siempre protagonista en el combate.",
        price: "20",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678680037/posters/dgk6llxgj4b89sqragjj.jpg",
        stock: 8,
        year: 2020,
        enabled: true,
        genders: [
          {
            gender: "sports",
          },
        ],
        platforms: [
          {
            name: "PS4",
            logo: "https://i.pinimg.com/originals/18/1e/fd/181efd4992e7d117710fff5b82c4ad78.jpg",
          },
        ],
        reviews: [],
      },
      {
        id: 14,
        name: "RECORE",
        description:
          "ReCore es un videojuego de acción creado por Keiji Inafune en exclusiva Microsoft (Ahora también en steam) para PC (Windows 7, 8.1 y 10) y Xbox One. La aventura pone al jugador en el rol de uno de los los últimos seres humanos de un planeta controlado por enemigos robóticos con el único objetivo de destruirle",
        price: "15",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678679419/posters/bukrew3efvwiogmxrfbl.jpg",
        stock: 23,
        year: 2020,
        enabled: true,
        genders: [
          {
            gender: "strategy",
          },
        ],
        platforms: [
          {
            name: "PC",
            logo: "https://st4.depositphotos.com/27847728/39420/v/600/depositphotos_394204744-stock-illustration-initial-pc-letter-logo-with.jpg",
          },
        ],
        reviews: [],
      },
      {
        id: 9,
        name: "GOD OF WAR RAGNAROK",
        description:
          "Desde Santa Monica Studio llega la secuela del aclamado por la crítica God of War (2018). Fimbulvetr ya está en camino. Kratos y Atreus deben viajar a cada uno de los nueve reinos en búsqueda de respuestas, mientras que las fuerzas asgardianas se preparan para una batalla profetizada que terminará con el mundo. En el camino explorarán paisajes increíbles y míticos, y se enfrentarán a aterradores enemigos en la forma de dioses nórdicos y monstruos. La amenaza del Ragnarok cada vez está más cerca. Kratos y Atreus deben elegir entre su propia seguridad y la seguridad de los reinos.",
        price: "20",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678678900/posters/wosyoewcg4eearn5vmx3.jpg",
        stock: 200,
        year: 2023,
        enabled: true,
        genders: [
          {
            gender: "adventure",
          },
        ],
        platforms: [
          {
            name: "PS4",
            logo: "https://i.pinimg.com/originals/18/1e/fd/181efd4992e7d117710fff5b82c4ad78.jpg",
          },
        ],
        reviews: [],
      },
      {
        id: 7,
        name: "ELDEN RING",
        description:
          "Levántate, tiznado, y déjate guiar por la gracia para esgrimir el poder del Anillo de Elden y convertirte en un Señor de Elden en las Tierras Intermedias. Un extenso mundo donde los campos abiertos, con una amplia variedad de situaciones, y las enormes mazmorras, con diseños complejos y tridimensionales, se conectan con total fluidez. Al explorar, te acompaña el entusiasmo por descubrir amenazas desconocidas y abrumadoras, lo que produce una gran sensación de logro.",
        price: "20",
        image:
          "https://res.cloudinary.com/dwfhsitwe/image/upload/v1678678711/posters/aci20dhjy4czz8xenazp.jpg",
        stock: 500,
        year: 2022,
        enabled: true,
        genders: [
          {
            gender: "adventure",
          },
        ],
        platforms: [
          {
            name: "PS5",
            logo: "https://images.pushsquare.com/7eb5640f6f42e/ps5-playstation-5-sony-1.large.jpg",
          },
        ],
        reviews: [],
      },
    ];
  
    let newProduct = "";
    let platform = "";
    let gender = "";
  try {
    for (let index in juegos) {
      [newProduct, created] = await Product.findOrCreate({
        where: {
          image: juegos[index].image,
          name: juegos[index].name,
          description: juegos[index].description,
          price: juegos[index].price,
          stock: juegos[index].stock,
          year: juegos[index].year,
          enabled: juegos[index].enabled,
        },
      });
      if(index % 7 === 0)
      console.log("newProduct: ", newProduct)
      if (created) {
        platform = await Platform.findAll({
          where: {
            name: juegos[index].platforms[0].name,
          },
        });
        await newProduct.addPlatform(platform);
      }
      

      if (created) {
        platform = await Platform.findAll({
          where: {
            name: juegos[index].platforms[0].name,
          },
        });
        if(index % 7 === 0)
        console.log("platform: ", platform)
        await newProduct.addPlatform(platform);
      
        gender = await Gender.findAll({
          where: {
            gender: juegos[index].genders[0].gender,
          },
        });
        if(index % 7 === 0)
        console.log("gender: ", gender)
        await newProduct.addGender(gender);
      }
    }
    res.status(200).send("Base de datos actualizada");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
