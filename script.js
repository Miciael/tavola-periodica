import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Tween, Easing, update as updateTween, removeAll as removeAllTweens } from '@tweenjs/tween.js';

// Dati dei 118 elementi: [Simbolo, Nome, Peso, Colonna, Riga, Descrizione, Categoria]
const tableData = [
  "H", "Idrogeno", "1.008", 1, 1, "L'idrogeno è il primo elemento della tavola periodica e l'elemento chimico più abbondante di tutto l'universo osservabile.", "nonmetal",
  "He", "Elio", "4.0026", 18, 1, "Gas nobile incolore e inodore. È il secondo elemento più leggero e abbondante nell'universo.", "noble",
  "Li", "Litio", "6.94", 1, 2, "Metallo alcalino soffice e d'argento. È l'elemento solido meno denso ed è fondamentale per le batterie ricaricabili.", "alkali",
  "Be", "Berillio", "9.0122", 2, 2, "Metallo di transizione leggero, duro e fragile. Utilizzato principalmente come agente legante nelle leghe di rame.", "alkaline-earth",
  "B", "Boro", "10.81", 13, 2, "Metallode a bassa abbondanza nell'universo. Utilizzato nella fabbricazione del vetro pyrex e fibra di vetro.", "metalloid",
  "C", "Carbonio", "12.011", 14, 2, "Elemento non metallico tetravalente. È il mattone fondamentale della chimica organica e di tutte le forme di vita conosciute.", "nonmetal",
  "N", "Azoto", "14.007", 15, 2, "Gas incolore e inodore che costituisce circa il 78% dell'atmosfera terrestre.", "nonmetal",
  "O", "Ossigeno", "15.999", 16, 2, "Non-metallo altamente reattivo, fondamentale per la respirazione cellulare di quasi tutti gli organismi viventi.", "nonmetal",
  "F", "Fluoro", "18.998", 17, 2, "L'elemento chimico più elettronegativo e reattivo. Forma composti con quasi tutti gli altri elementi.", "halogen",
  "Ne", "Neon", "20.180", 18, 2, "Gas nobile che emette una caratteristica luce rosso-arancione quando utilizzato nelle lampade a scarica.", "noble",
  "Na", "Sodio", "22.990", 1, 3, "Metallo alcalino reattivo e morbido. È un componente essenziale del sale da cucina (cloruro di sodio).", "alkali",
  "Mg", "Magnesio", "24.305", 2, 3, "Metallo leggero e resistente, fondamentale per la clorofilla nelle piante e le funzioni muscolari negli animali.", "alkaline-earth",
  "Al", "Alluminio", "26.982", 13, 3, "Metallo duttile di colore argento. Celebre per la sua resistenza all'ossidazione e la sua leggerezza.", "post-transition",
  "Si", "Silicio", "28.085", 14, 3, "Semiconduttore ampiamente utilizzato nei microchip dell'elettronica moderna e nei pannelli solari.", "metalloid",
  "P", "Fosforo", "30.974", 15, 3, "Elemento essenziale per la vita, costituisce la struttura scheletrica dell'ATP e del DNA.", "nonmetal",
  "S", "Zolfo", "32.06", 16, 3, "Non-metallo di colore giallo brillante. Utilizzato per la produzione di acido solforico e la vulcanizzazione della gomma.", "nonmetal",
  "Cl", "Cloro", "35.45", 17, 3, "Gas giallo-verde con un odore soffocante. Potente disinfettante usato per la purificazione dell'acqua.", "halogen",
  "Ar", "Argon", "39.948", 18, 3, "Il terzo gas più abbondante nell'atmosfera terrestre. Utilizzato in lampadine e saldature protettive.", "noble",
  "K", "Potassio", "39.098", 1, 4, "Metallo alcalino essenziale per la trasmissione degli impulsi nervosi e la regolazione della pressione sanguigna.", "alkali",
  "Ca", "Calcio", "40.078", 2, 4, "Metallo alcalino-terroso reattivo. È il minerale più abbondante nel corpo umano, fondamentale per ossa e denti.", "alkaline-earth",
  "Sc", "Scandio", "44.956", 3, 4, "Metallo leggero di transizione, impiegato in leghe d'alluminio per attrezzature sportive e componenti aerospaziali.", "transition",
  "Ti", "Titanio", "47.867", 4, 4, "Metallo famoso per la sua elevata resistenza alla corrosione e il suo alto rapporto resistenza/peso.", "transition",
  "V", "Vanadio", "50.942", 5, 4, "Metallo duro usatissimo come additivo negli acciai per migliorarne tenacità e resistenza meccanica.", "transition",
  "Cr", "Cromo", "51.996", 6, 4, "Metallo lucido e duro, impiegato nella produzione di acciaio inossidabile e nei rivestimenti galvanici.", "transition",
  "Mn", "Manganese", "54.938", 7, 4, "Elemento fondamentale nell'industria siderurgica per la desolforazione e deossidazione dell'acciaio.", "transition",
  "Fe", "Ferro", "55.845", 8, 4, "Il metallo più comune sulla Terra per massa. È il componente principale dell'acciaio ed è essenziale nell'emoglobina.", "transition",
  "Co", "Cobalto", "58.933", 9, 4, "Metallo ferromagnetico impiegato nella produzione di batterie al litio e leghe resistenti al calore.", "transition",
  "Ni", "Nichel", "58.693", 10, 4, "Metallo argentato resistente alla corrosione. Utilizzato nelle monete, nelle batterie e nell'acciaio inox.", "transition",
  "Cu", "Rame", "63.546", 11, 4, "Metallo duttile con un'elevatissima conducibilità elettrica e termica. Usato per cavi elettrici e tubature.", "transition",
  "Zn", "Zinc", "65.38", 12, 4, "Metallo utilizzato principalmente per la zincatura dell'acciaio per proteggerlo dalla ruggine.", "transition",
  "Ga", "Gallio", "69.723", 13, 4, "Metallo unico che fonde a circa 29.7°C (si scioglie tenendolo in mano). Usato nei semiconduttori avanzati.", "post-transition",
  "Ge", "Germanio", "72.630", 14, 4, "Semiconduttore impiegato nella fibra ottica, nell'elettronica ad alta velocità e nei sensori a infrarossi.", "metalloid",
  "As", "Arsenico", "74.922", 15, 4, "Semimetallo celebre per la sua tossicità storica. Trova impiego come drogante nei semiconduttori.", "metalloid",
  "Se", "Selenio", "78.971", 16, 4, "Possiede proprietà fotovoltaiche e fotoconducenti. Utilizzato in celle solari e fotocopiatrici.", "nonmetal",
  "Br", "Bromo", "79.904", 17, 4, "L'unico elemento non metallico che si presenta liquido a temperatura ambiente. Ha un colore rosso-bruno.", "halogen",
  "Kr", "Kripton", "83.798", 18, 4, "Gas nobile utilizzato nell'illuminazione ad alte prestazioni, come nei flash fotografici professionali.", "noble",
  "Rb", "Rubidio", "85.468", 1, 5, "Metallo alcalino estremamente reattivo che si accende spontaneamente all'aria. Utilizzato negli orologi atomici.", "alkali",
  "Sr", "Stronzio", "87.62", 2, 5, "Metallo che brucia con una vivida fiamma rossa, motivo per cui è usato nei fuochi d'artificio.", "alkaline-earth",
  "Y", "Ittrio", "88.906", 3, 5, "Metallo impiegato per la creazione di fosfori nei LED e nei superconduttori ad alta temperatura.", "transition",
  "Zr", "Zirconio", "91.224", 4, 5, "Metallo altamente resistente alla corrosione, impiegato nei rivestimenti delle barre di combustibile nucleare.", "transition",
  "Nb", "Niobio", "92.906", 5, 5, "Usato in leghe superconduttrici per magneti di risonanza magnetica (MRI) e acceleratori di particelle.", "transition",
  "Mo", "Molibdeno", "95.95", 6, 5, "Possiede uno dei punti di fusione più alti tra gli elementi. Aumenta la durezza degli acciai speciali.", "transition",
  "Tc", "Tecnezio", "97", 7, 5, "Primo elemento creato artificialmente. Il suo isotopo 99m è fondamentale in medicina nucleare.", "transition",
  "Ru", "Rutenio", "101.07", 8, 5, "Metallo raro del gruppo del platino. Usato per indurire leghe di platino e palladio.", "transition",
  "Rh", "Rodio", "102.91", 9, 5, "Uno dei metalli più rari e costosi al mondo, utilizzato principalmente nei catalizzatori delle automobili.", "transition",
  "Pd", "Palladio", "106.42", 10, 5, "Metallo prezioso capace di assorbire fino a 900 volte il suo volume in idrogeno. Usato in catalizzatori e gioielleria.", "transition",
  "Ag", "Argento", "107.87", 11, 5, "Possiede la più alta conducibilità elettrica, conducibilità termica e riflettanza di qualsiasi metallo.", "transition",
  "Cd", "Cadmio", "112.41", 12, 5, "Metallo pesante tossico storicamente impiegato in batterie nichel-cadmio e pigmenti gialli.", "transition",
  "In", "Indio", "114.82", 13, 5, "Componente chiave dell'ossido di indio-stagno (ITO), fondamentale per la produzione di schermi touch screen.", "post-transition",
  "Sn", "Stagno", "118.71", 14, 5, "Metallo duttile usato fin dall'antichità per creare il bronzo e oggi per le saldature elettroniche.", "post-transition",
  "Sb", "Antimonio", "121.76", 15, 5, "Semimetallo usato per aumentare la durezza del piombo nelle batterie e come ritardante di fiamma.", "metalloid",
  "Te", "Tellurio", "127.60", 16, 5, "Semimetallo raro impiegato nei pannelli solari a pellicola sottile e nei dischi ottici scrivibili.", "metalloid",
  "I", "Iodio", "126.90", 17, 5, "Alogeno viola scuro. Essenziale per gli ormoni tiroidei e ampiamente usato come disinfettante medico.", "halogen",
  "Xe", "Xeno", "131.29", 18, 5, "Gas nobile pesante usato nelle lampade ad arco medico, nei fari ad alta intensità e come propellente ionico spaziale.", "noble",
  "Cs", "Cesio", "132.91", 1, 6, "Metallo alcalino che definisce la durata esatta del secondo negli orologi atomici ad altissima precisione.", "alkali",
  "Ba", "Bario", "137.33", 2, 6, "Metallo morbido usato come mezzo di contrasto nei radiogrammi dell'apparato digerente.", "alkaline-earth",
  "La", "Lantanio", "138.91", 3, 9, "Capostipite dei lantanidi. Utilizzato negli obiettivi per fotocamere di alta qualità e batterie ibride.", "lanthanide",
  "Ce", "Cerio", "140.12", 4, 9, "Lantanide abbondante usato come catalizzatore e nelle pietrine per accendini per creare scintille.", "lanthanide",
  "Pr", "Praseodimio", "140.91", 5, 9, "Dona al vetro un caratteristico colore giallo-verde ed è impiegato in potenti magneti permanenti.", "lanthanide",
  "Nd", "Neodimio", "144.24", 6, 9, "Famoso per la creazione dei magneti permanenti più potenti conosciuti (magneti al neodimio).", "lanthanide",
  "Pm", "Promezio", "145", 7, 9, "Elemento radioattivo artificiale impiegato in microbatterie atomiche per sonde spaziali.", "lanthanide",
  "Sm", "Samario", "150.36", 8, 9, "Usato in magneti permanenti resistenti alle alte temperature e nella cura di alcuni tumori ossei.", "lanthanide",
  "Eu", "Europio", "151.96", 9, 9, "Utilizzato per generare il colore rosso nei tubi catodici e nei sistemi anticontraffazione delle banconote Euro.", "lanthanide",
  "Gd", "Gadolinio", "157.25", 10, 9, "Metallo con eccezionali proprietà assorbenti di neutroni, usato come agente di contrasto nella Risonanza Magnetica.", "lanthanide",
  "Tb", "Terbio", "158.93", 11, 9, "Usato nei fosfori verdi di schermi e lampade a fluorescenza, oltre che nei dispositivi acustici navali.", "lanthanide",
  "Dy", "Disprosio", "162.50", 12, 9, "Ha una spiccata attrazione magnetica. Aggiunto ai magneti per evitarne la smagnetizzazione ad alte temperature.", "lanthanide",
  "Ho", "Olmio", "164.93", 13, 9, "Elemento con il momento magnetico più elevato di qualsiasi elemento naturale.", "lanthanide",
  "Er", "Erbio", "167.26", 14, 9, "I suoi ioni sono usati come mezzo amplificatore nelle comunicazioni in fibra ottica.", "lanthanide",
  "Tm", "Tulio", "168.93", 15, 9, "Uno dei lantanidi più rari. Utilizzato come fonte di raggi X nei radiografi portatili.", "lanthanide",
  "Yb", "Itterbio", "173.05", 16, 9, "Impiegato nei laser ad alta frequenza e negli orologi atomici di nuova generazione.", "lanthanide",
  "Lu", "Lutezio", "174.97", 17, 9, "Il più duro e denso dei lantanidi. Utilizzato nei rilevatori della tomografia a emissione di positroni (PET).", "lanthanide",
  "Hf", "Afnio", "178.49", 4, 6, "Ottimo assorbitore di neutroni, usato nelle barre di controllo dei reattori dei sottomarini nucleari.", "transition",
  "Ta", "Tantalio", "180.95", 5, 6, "Metallo inerte e resistentissimo, indispensabile per i micro-condensatori di smartphone e apparecchi medici.", "transition",
  "W", "Tungsteno", "183.84", 6, 6, "Detiene il punto di fusione più alto di tutti i metalli (3422°C). Usato in filamenti e utensili da taglio.", "transition",
  "Re", "Renio", "186.21", 7, 6, "Metallo ad altissima densità usato nelle superleghe per le pale delle turbine dei motori a reazione.", "transition",
  "Os", "Osmio", "190.23", 8, 6, "L'elemento naturale più denso conosciuto sulla Terra (22.59 g/cm³).", "transition",
  "Ir", "Iridio", "192.22", 9, 6, "Il metallo più resistente alla corrosione. Un suo strato si è depositato sulla Terra dopo l'impatto del meteorite dei dinosauri.", "transition",
  "Pt", "Platino", "195.08", 10, 6, "Metallo nobile inerte di alto valore, usato in gioielleria, marmitte catalitiche e nella farmaceutica antitumorale.", "transition",
  "Au", "Oro", "196.97", 11, 6, "Metallo prezioso inalterabile, estremamente malleabile e duttile, storicamente base dei sistemi monetari.", "transition",
  "Hg", "Mercurio", "200.59", 12, 6, "L'unico metallo comune ad essere liquido a temperatura ambiente. Altamente tossico.", "transition",
  "Tl", "Tallio", "204.38", 13, 6, "Metallo tenero e tossico, impiegato storicamente in insetticidi e attualmente nella fotometria.", "post-transition",
  "Pb", "Piombo", "207.2", 14, 6, "Metallo pesante e denso usatissimo per la schermatura contro le radiazioni ionizzanti e i raggi X.", "post-transition",
  "Bi", "Bismuto", "208.98", 15, 6, "Metallo pesante sorprendentemente poco tossico, famoso per la formazione di cristalli iridescenti.", "post-transition",
  "Po", "Polonio", "209", 16, 6, "Elemento radioattivo scoperto da Marie Curie e dedicato alla sua terra d'origine, la Polonia.", "post-transition",
  "At", "Astato", "210", 17, 6, "L'elemento naturale più raro nella crosta terrestre: si stima ne esista meno di 30 grammi in totale.", "halogen",
  "Rn", "Radon", "222", 18, 6, "Gas nobile radioattivo incolore ed inodore prodotto dal decadimento dell'uranio nel suolo.", "noble",
  "Fr", "Francio", "223", 1, 7, "Metallo alcalino radioattivo ed estremamente instabile con un'emivita di soli 22 minuti.", "alkali",
  "Ra", "Radio", "226", 2, 7, "Elemento scoperto da Marie e Pierre Curie, un tempo usato per le vernici luminescenti degli orologi.", "alkaline-earth",
  "Ac", "Attinio", "227", 3, 10, "Elemento radioattivo fortemente luminescente al buio a causa dell'intensa energia emessa.", "actinide",
  "Th", "Torio", "232.04", 4, 10, "Metallo radioattivo studiato come alternativa più pulita e sicura all'uranio per l'energia nucleare.", "actinide",
  "Pa", "Proattinio", "231.04", 5, 10, "Elemento radioattivo raro e tossico presente nei minerali di pechblenda.", "actinide",
  "U", "Uranio", "238.03", 6, 10, "Metallo denso e radioattivo, principale combustibile impiegato nelle centrali a fissione nucleare.", "actinide",
  "Np", "Nettunio", "237", 7, 10, "Primo elemento transuranico sintetizzato artificialmente, prodotto come sottoprodotto nei reattori nucleari.", "actinide",
  "Pu", "Plutonio", "239", 8, 10, "Elemento fissile utilizzato per la fabbricazione di armi nucleari e generatori termoelettrici per sonde spaziali.", "actinide",
  "Am", "Americio", "243", 9, 10, "Elemento sintetico radioattivo utilizzato in piccolissime quantità nei rilevatori domestici di fumo.", "actinide",
  "Cm", "Curio", "247", 10, 10, "Prende il nome dai coniugi Curie. Fortemente radioattivo, impiegato negli analizzatori alfa per esplorazioni spaziali.", "actinide",
  "Bk", "Berkelio", "247", 11, 10, "Sintetizzato nel 1949 a Berkeley, in California. Prodotto solo in quantità microscopiche.", "actinide",
  "Cf", "Californio", "251", 12, 10, "Potente emettitore di neutroni, usato per identificare giacimenti petroliferi e lo stress dei materiali.", "actinide",
  "Es", "Einstenio", "252", 13, 10, "Scoperto nei detriti del primo test della bomba all'idrogeno nel 1952. Intitolato ad Albert Einstein.", "actinide",
  "Fm", "Fermio", "257", 14, 10, "Elemento sintetico intitolato al fisico italiano Enrico Fermi, creatore del primo reattore nucleare.", "actinide",
  "Md", "Mendelevio", "258", 15, 10, "Dedicato a Dmitrij Mendeleev, il padre inventore della tavola periodica degli elementi.", "actinide",
  "No", "Nobelio", "259", 16, 10, "Elemento sintetico transuranico intitolato ad Alfred Nobel, fondatore dei premi Nobel.", "actinide",
  "Lr", "Laurenzio", "262", 17, 10, "Intitolato ad Ernest Lawrence, inventore del ciclotrone per l'accelerazione delle particelle.", "actinide",
  "Rf", "Rutherfordio", "267", 4, 7, "Elemento superpesante sintetizzato in laboratorio, intitolato a Ernest Rutherford.", "transition",
  "Db", "Dubnio", "270", 5, 7, "Elemento sintetico intitolato al centro di ricerca nucleare situato a Dubna, in Russia.", "transition",
  "Sg", "Seaborgio", "271", 6, 7, "Intitolato al chimico Glenn Seaborg, vincitore del Nobel per le sue scoperte sugli elementi transuranici.", "transition",
  "Bh", "Bohrio", "270", 7, 7, "Elemento superpesante e radioattivo intitolato al fisico danese Niels Bohr.", "transition",
  "Hs", "Hassio", "277", 8, 7, "Sintetizzato per la prima volta nel 1984 a Darmstadt, il cui nome deriva dal territorio dell'Assia.", "transition",
  "Mt", "Meitnerio", "278", 9, 7, "Intitolato alla fisica Lise Meitner, pioniera degli studi sulla fissione nucleare.", "transition",
  "Ds", "Darmstadtio", "281", 10, 7, "Sintetizzato e intitolato in onore della città tedesca di Darmstadt.", "transition",
  "Rg", "Roentgenio", "282", 11, 7, "Prende il nome da Wilhelm Röntgen, lo scienziato che scoprì i raggi X.", "transition",
  "Cn", "Copernicio", "285", 12, 7, "Dedicato al celebre astronomo Niccolò Copernico, formulatore della teoria eliocentrica.", "transition",
  "Nh", "Nihonio", "286", 13, 7, "Primo elemento sintetizzato in Asia (Giappone); 'Nihon' significa letteralmente Giappone.", "post-transition",
  "Fl", "Flerovio", "289", 14, 7, "Intitolato al laboratorio Flerov di reazioni nucleari della Russia.", "post-transition",
  "Mc", "Moscovio", "290", 15, 7, "Sintetizzato in collaborazione tra scienziati russi ed americani nei pressi di Mosca.", "post-transition",
  "Lv", "Livermorio", "293", 16, 7, "Prende il nome dal Lawrence Livermore National Laboratory in California.", "post-transition",
  "Ts", "Tennessinio", "294", 17, 7, "Intitolato allo stato americano del Tennessee per il suo contributo alla sintesi degli elementi pesanti.", "halogen",
  "Og", "Oganesson", "294", 18, 7, "L'elemento più pesante attualmente presente sulla tavola periodica. Intitolato al fisico Yuri Oganessian.", "noble"
];

let camera, scene, renderer, controls;
const objects = [];
const targets = { table: [], sphere: [], helix: [], grid: [] };

// Salva la posizione precedente prima dello zoom
let previousCameraPosition = new THREE.Vector3();
let previousControlsTarget = new THREE.Vector3();

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 3000;

    scene = new THREE.Scene();

    // Creazione elementi 3D
    for (let i = 0; i < tableData.length; i += 7) {
        const symbolStr = tableData[i];
        const nameStr = tableData[i + 1];
        const weightStr = tableData[i + 2];
        const col = tableData[i + 3];
        const row = tableData[i + 4];
        const descStr = tableData[i + 5];
        const categoryClass = tableData[i + 6];

        const element = document.createElement('div');
        // Aggiunge sia la classe base che la classe specifica per categoria
        element.className = `element ${categoryClass}`;

        const number = document.createElement('div');
        number.className = 'number';
        number.textContent = (i / 7) + 1;
        element.appendChild(number);

        const symbol = document.createElement('div');
        symbol.className = 'symbol';
        symbol.textContent = symbolStr;
        element.appendChild(symbol);

        const details = document.createElement('div');
        details.className = 'details';
        details.innerHTML = nameStr + '<br>' + weightStr;
        element.appendChild(details);

        const objectCSS = new CSS3DObject(element);
        objectCSS.position.x = Math.random() * 4000 - 2000;
        objectCSS.position.y = Math.random() * 4000 - 2000;
        objectCSS.position.z = Math.random() * 4000 - 2000;
        scene.add(objectCSS);

        objects.push(objectCSS);

        // Evento al click dell'elemento
        element.addEventListener('pointerdown', (event) => {
            event.stopPropagation();

            previousCameraPosition.copy(camera.position);
            previousControlsTarget.copy(controls.target);

            zoomToElement(objectCSS);
            showModal(symbolStr, nameStr, (i / 7) + 1, weightStr, descStr);
        });

        // Layout: Table
        const objectTable = new THREE.Object3D();
        objectTable.position.x = (col * 150) - 1400;
        objectTable.position.y = - (row * 190) + 1000;
        targets.table.push(objectTable);
    }

    const vector = new THREE.Vector3();

    // Layout: Sphere
    for (let i = 0, l = objects.length; i < l; i++) {
        const phi = Math.acos(- 1 + (2 * i) / l);
        const theta = Math.sqrt(l * Math.PI) * phi;

        const object = new THREE.Object3D();
        object.position.setFromSphericalCoords(850, phi, theta);
        vector.copy(object.position).multiplyScalar(2);
        object.lookAt(vector);

        targets.sphere.push(object);
    }

    // Layout: Helix
    for (let i = 0, l = objects.length; i < l; i++) {
        const theta = i * 0.175 + Math.PI;
        const y = - (i * 8) + 450;

        const object = new THREE.Object3D();
        object.position.setFromCylindricalCoords(950, theta, y);

        vector.x = object.position.x * 2;
        vector.y = object.position.y;
        vector.z = object.position.z * 2;
        object.lookAt(vector);

        targets.helix.push(object);
    }

    // Layout: Grid
    for (let i = 0; i < objects.length; i++) {
        const object = new THREE.Object3D();
        object.position.x = ((i % 5) * 360) - 720;
        object.position.y = (- (Math.floor(i / 5) % 5) * 360) + 720;
        object.position.z = (Math.floor(i / 25)) * 800 - 1600;

        targets.grid.push(object);
    }

    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 6000;

    document.getElementById('table').addEventListener('click', () => transform(targets.table, 2000));
    document.getElementById('sphere').addEventListener('click', () => transform(targets.sphere, 2000));
    document.getElementById('helix').addEventListener('click', () => transform(targets.helix, 2000));
    document.getElementById('grid').addEventListener('click', () => transform(targets.grid, 2000));

    transform(targets.table, 2000);

    window.addEventListener('resize', onWindowResize);
    document.getElementById('close-modal').addEventListener('click', closeModal);
}

// Zoom della telecamera
function zoomToElement(targetObject) {
    new Tween(camera.position)
        .to({
            x: targetObject.position.x,
            y: targetObject.position.y,
            z: targetObject.position.z + 500
        }, 1200)
        .easing(Easing.Cubic.Out)
        .start();

    new Tween(controls.target)
        .to({
            x: targetObject.position.x,
            y: targetObject.position.y,
            z: targetObject.position.z
        }, 1200)
        .easing(Easing.Cubic.Out)
        .start();
}

// Ripristina la posizione esatta della telecamera a prima del click
function restoreCameraPosition() {
    new Tween(camera.position)
        .to({
            x: previousCameraPosition.x,
            y: previousCameraPosition.y,
            z: previousCameraPosition.z
        }, 1200)
        .easing(Easing.Cubic.Out)
        .start();

    new Tween(controls.target)
        .to({
            x: previousControlsTarget.x,
            y: previousControlsTarget.y,
            z: previousControlsTarget.z
        }, 1200)
        .easing(Easing.Cubic.Out)
        .start();
}

function showModal(symbol, name, num, weight, desc) {
    document.getElementById('modal-symbol').textContent = symbol;
    document.getElementById('modal-title').textContent = name;
    document.getElementById('modal-details').textContent = `N° Atomico: ${num} | Peso Atomico: ${weight}`;
    document.getElementById('modal-desc').textContent = desc;
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    restoreCameraPosition();
}

function transform(targetLayout, duration) {
    removeAllTweens();

    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        const target = targetLayout[i];

        new Tween(object.position)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
            .easing(Easing.Exponential.InOut)
            .start();

        new Tween(object.rotation)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            .easing(Easing.Exponential.InOut)
            .start();
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    requestAnimationFrame(animate);
    updateTween();
    controls.update();
    render();
}

function render() {
    renderer.render(scene, camera);
}