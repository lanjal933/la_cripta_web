// Character Creation Wizard - La Cripta
// Data parsing and wizard logic for D&D 5e character creation

// Global state
let characterState = {
    race: null,
    class: null,
    background: null,
    languages: [],
    additionalLanguages: [],
    equipment: [],
    equipmentChoices: {},
    currentPhase: 0
};

// Embedded data - Races
const racesData = [
    { name: "Aarakocra", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "Rafaga de viento Niv-3 int/car/sab", extras: "Garras" },
    { name: "Aasimar", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "Luz Niv-1 car", extras: "" },
    { name: "Alto Elfo", bonuses: "+2Des/+1Int", languages: "Común/Élfico", skills: "Percepción", tools: "", spells: "Truco de mago a elección", extras: "" },
    { name: "Anómalo", bonuses: "+2/+1/+1", languages: "Común/+2", skills: "Intimidar", tools: "", spells: "", extras: "" },
    { name: "Arakne Carmina", bonuses: "+2/+1", languages: "Común/Infra Común", skills: "", tools: "", spells: "Truco de mago a elección car/sab/int, Fuego Feérico Niv-3 car/sab/int, Telaraña Niv-3 car/sab/int", extras: "" },
    { name: "Arakne Manus", bonuses: "+2/+1", languages: "Común/Infra Común", skills: "", tools: "", spells: "Telaraña Niv-3 car/sab/int", extras: "" },
    { name: "Arakne Morsus", bonuses: "+2/+1", languages: "Común/Infra Común", skills: "", tools: "", spells: "Telaraña Niv-3 car/sab/int", extras: "" },
    { name: "Arakne Vultus", bonuses: "+2/+1", languages: "Común/Infra Común", skills: "Percepción", tools: "", spells: "Telaraña Niv-3 car/sab/int", extras: "" },
    { name: "Autognomo", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "+2 Competencias con herramientas a eleccion", spells: "", extras: "" },
    { name: "Aven (Cabeza de Búho)", bonuses: "+2/", languages: "Común/+1", skills: "Sigilo", tools: "", spells: "", extras: "" },
    { name: "Aven (Cabeza de Halcón)", bonuses: "+2/", languages: "Común/+1", skills: "Percepción", tools: "", spells: "", extras: "" },
    { name: "Aven (Cabeza de Serpentario)", bonuses: "+2/", languages: "Común/+1", skills: "", tools: "", spells: "", extras: "" },
    { name: "Cambiante", bonuses: "+2/+1", languages: "Común/+1", skills: "Escoger: Acro/Atle/Inti/Super", tools: "", spells: "", extras: "" },
    { name: "Canido Juguete", bonuses: "+2/+1", languages: "Común/+1", skills: "Percepción", tools: "", spells: "", extras: "Dientes afilados" },
    { name: "Canido Pastor", bonuses: "+2/+1", languages: "Común/+1", skills: "Percepción", tools: "", spells: "", extras: "Dientes afilados" },
    { name: "Cazador Cerúleo", bonuses: "+2/+1", languages: "Común/Silvano", skills: "", tools: "", spells: "Shillelagh int/car/sab, Enmarañar Niv-3 int/car/sab, Piel Robliza Niv-5 int/car/sab", extras: "" },
    { name: "Centauro", bonuses: "+2/+1", languages: "Común/+1", skills: "Escoger: Med/Nat/Super/TratA", tools: "", spells: "", extras: "Cascos" },
    { name: "Decapitado", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "", extras: "" },
    { name: "Dhampiro", bonuses: "+2/+1", languages: "Común/+1", skills: "+2 a escojer", tools: "", spells: "", extras: "Mordisco Vampírico" },
    { name: "Dracónido", bonuses: "+2Fue/+1Car", languages: "Común/Dracónido", skills: "", tools: "", spells: "", extras: "Aliento de Dragón" },
    { name: "Dracónido Cromático", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "", extras: "Ataque de Aliento" },
    { name: "Dracónido Gema", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "", extras: "Ataque de Aliento" },
    { name: "Dracónido Metálico", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "", extras: "Ataque de Aliento, Ataque de Aliento Metálico Niv-5" },
    { name: "Duergar", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "Agrandar/Reducir Niv-3 car/sab/int, Invisibilidad Niv-5 car/sab int", extras: "" },
    { name: "Eladrin", bonuses: "+2/+1", languages: "Común/+1", skills: "Percepción", tools: "", spells: "", extras: "" },
    { name: "Elfo Astral", bonuses: "+2/+1", languages: "Común/+1", skills: "Percepción", tools: "", spells: "Luces danzantes, luz o llama sagrada car/int/sab", extras: "" },
    { name: "Elfo de los bosques", bonuses: "+2Des/+1Sab", languages: "Común/Élfico", skills: "Percepción", tools: "", spells: "", extras: "" },
    { name: "Elfo Drow (oscuro)", bonuses: "+2Des/+1Car", languages: "Común/Élfico", skills: "Percepción", tools: "", spells: "Luces danzantes car/int/sab, Fuego Feérico Niv-3 car/int/sab", extras: "" },
    { name: "Elfo Marino", bonuses: "+2/+1", languages: "Común/+1", skills: "Percepción", tools: "", spells: "", extras: "" },
    { name: "Enano de las colinas", bonuses: "+2Con/+1Sab", languages: "Común/Enano", skills: "", tools: "Escoger: H. Armero/H. Cervecero/H. Albañil", spells: "", extras: "" },
    { name: "Enano de las Montañas", bonuses: "+2Con/+2Fue", languages: "Común/Enano", skills: "", tools: "Escoger: H. Armero/H. Cervecero/H. Albañil", spells: "", extras: "" },
    { name: "Enanos grises (Duergar)", bonuses: "+2Con/+1Fue", languages: "Común/Enano/infra común", skills: "", tools: "Escoger: H. Armero/H. Cervecero/H. Albañil", spells: "", extras: "" },
    { name: "Firbolg", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "Detectar Magia int/car/sab, Disfrazarse int/char/int", extras: "" },
    { name: "Genasi de agua", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "Salpicadura ácida int/car/sab, Crear o Destruir agua Niv-3 Int/car/sab, Caminar sobre el agua Niv-5 int/car/sab", extras: "" },
    { name: "Genasi de aire", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "Agarre electrizante int/car/sab, Caída de Pluma agua Niv-3 Int/car/sab, Levitar Niv-5 int/car/sab", extras: "" },
    { name: "Genasi de fuego", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "Crear llamas int/car/sab, Manos ardientes Niv-3 Int/car/sab, Hoja de fuego Niv-5 int/car/sab", extras: "" },
    { name: "Genasi de tierra", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "Guardia de Cuchillas int/car/sab, Pasar sin rastro Niv-5 int/car/sab", extras: "" },
    { name: "Giff", bonuses: "+2/+1", languages: "Común/+1", skills: "Atletismo", tools: "", spells: "", extras: "" },
    { name: "Githyanki", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "Mano de mago int/car/sab, Salto Niv-3 Int/car/sab, Paso brumoso Niv-5 int/car/sab", extras: "" },
    { name: "Githzerai", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "Mano de mag int/car/sab, Escudo Niv-3 Int/car/sab, Detectar Pensamientos Niv-5 int/car/sab", extras: "" },
    { name: "Gnomo de las Profundidades( Svirfneblins)", bonuses: "+2Int/+1Des", languages: "Común/Gnomo/Infra Común", skills: "", tools: "", spells: "", extras: "" },
    { name: "Gnomo de las Profundidades", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "Disfrazarse Niv-3 int/car/sab, Indetectable Niv-5 int/car/sab", extras: "" },
    { name: "Gnomo de las Rocas", bonuses: "+2Int/+1Con", languages: "Común/Gnomo", skills: "", tools: "H. Artesano", spells: "", extras: "" },
    { name: "Gnomo de los Bosques", bonuses: "+2Int/+1Des", languages: "Común/Gnomo", skills: "", tools: "", spells: "Ilusion menor int", extras: "" },
    { name: "Goblin", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "", extras: "" },
    { name: "Goliat", bonuses: "+2/+1", languages: "Común/+1", skills: "Atletismo", tools: "", spells: "", extras: "" },
    { name: "Hada", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "Saber Druidico int/car/sab, Fuego Feerico Niv-3 Int/car/sab, Agradar/Reducir Niv-5 int/car/sab", extras: "" },
    { name: "Hadozee", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "", extras: "" },
    { name: "Hobgoblin", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "", extras: "Don Feerico Niv-3" },
    { name: "Hombre lagarto", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "", extras: "CA 13+Des sin armadura" },
    { name: "Humano", bonuses: "+1 en todo", languages: "Común/+1", skills: "", tools: "", spells: "", extras: "" },
    { name: "Humano (Alternativo)", bonuses: "+1 en dos caracteristicas", languages: "Común/+1", skills: "+1 Escojer: Entre todos", tools: "", spells: "", extras: "Dote adicional" },
    { name: "Kenku", bonuses: "+2/+1", languages: "Común/+1", skills: "+2 Escojer: Entre todos", tools: "", spells: "", extras: "" },
    { name: "Kitsune Ártico o Blanco", bonuses: "+2/+1", languages: "Común/+1", skills: "Escoger: Eng/Inter/Inti/Pers/Pers/Pers", tools: "", spells: "Congelar int/car/sab, Fuego Feérico Niv-3 Int/car/sab, Hielo inmovilizador Niv-5 int/car/sab", extras: "" },
    { name: "Kitsune Común o Rojo", bonuses: "+2/+1", languages: "Común/+1", skills: "Escoger: Eng/Inter/Inti/Perce/Pers/Persu", tools: "", spells: "Luces danzantes int/car/sab, Hechizar persona Niv-3 Int/car/sab, Sugestión Niv-5 int/car/sab", extras: "" },
    { name: "Kitsune Fennec o Amarillo", bonuses: "+2/+1", languages: "Común/+1", skills: "Escoger: Eng/Inter/Inti/Perce/Pers/Persu", tools: "", spells: "Prestidigitación int/car/sab, Retirada Expeditiva Niv-3 Int/car/sab, Pasar sin rastro Niv-5 int/car/sab", extras: "" },
    { name: "Kobold", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "", extras: "Dote adicional Niv-1" },
    { name: "Liebren", bonuses: "+2/+1", languages: "Común/+1", skills: "Percepción", tools: "", spells: "", extras: "" },
    { name: "Mediano Fornido", bonuses: "+2Dez/+1Car", languages: "Común/Mediano", skills: "", tools: "", spells: "", extras: "" },
    { name: "Mediano Pies Ligeros", bonuses: "+2Dez/+1Con", languages: "Común/Mediano", skills: "", tools: "", spells: "", extras: "" },
    { name: "Medianos Fantasagaces", bonuses: "+2Dez/+1Sab", languages: "Común/Mediano", skills: "", tools: "", spells: "", extras: "" },
    { name: "Minotauro", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "", extras: "Cuernos" },
    { name: "Orco", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "", extras: "" },
    { name: "Osgo", bonuses: "+2/+1", languages: "Común/+1", skills: "Sigilo", tools: "", spells: "", extras: "" },
    { name: "Plasmoide", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "", extras: "" },
    { name: "Pseudo-Salamander Herencia de mar de llamas", bonuses: "+2/+1", languages: "Común/+1", skills: "Atletismo +1 escoger", tools: "H. Herrero", spells: "", extras: "Cola de Obsidiana" },
    { name: "Pseudo-Salamander Herencia de Rafaga", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "H. Herrero/S. Pintor", spells: "", extras: "Cola de Obsidiana" },
    { name: "Pseudo-Salamander Herencia de Robustez", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "H. Herrero/H. Joyero", spells: "", extras: "Cola de Obsidiana" },
    { name: "Pseudo-Salamander Herencia de Torrente", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "H. Herrero", spells: "Modear Agua", extras: "Cola de Obsidiana" },
    { name: "Rakkun", bonuses: "+2/+1", languages: "Común/+1", skills: "Juego de manos", tools: "Escoger: entre todos", spells: "", extras: "" },
    { name: "Renacido", bonuses: "+2/+1", languages: "Común/+1", skills: "+2 a escojer", tools: "", spells: "", extras: "" },
    { name: "Replicante", bonuses: "+2/+1", languages: "Común/+1", skills: "+2 a escojer: Eng/Inter/Inti/Perspi/Persua", tools: "", spells: "", extras: "" },
    { name: "Sangre Maléfica", bonuses: "+2/+1", languages: "Común/+1", skills: "+2 a escojer", tools: "", spells: "Disfrazarse int/sab/car, Maleficio int/sab/car", extras: "" },
    { name: "Sátiro", bonuses: "+2/+1", languages: "Común/+1", skills: "Interpretación/Percusión", tools: "", spells: "", extras: "Embestir" },
    { name: "Semielfo", bonuses: "+2Car/+1", languages: "Común/elfico/+1", skills: "+2 a escoger", tools: "", spells: "", extras: "" },
    { name: "Semielfo (zafa)", bonuses: "+2/+1/+1", languages: "Común/elfico/+1", skills: "+2 a escoger", tools: "", spells: "", extras: "" },
    { name: "Semi Elfo de bosque (Máscara de la naturaleza)", bonuses: "+2Car/+1", languages: "Común/elfico/+1", skills: "", tools: "", spells: "", extras: "" },
    { name: "Semi Elfo del bosque (entrenamiento de armas élficas)", bonuses: "+2Car/+1", languages: "Común/elfico/+1", skills: "", tools: "", spells: "", extras: "" },
    { name: "Semi Elfo del bosque (Pies veloces)", bonuses: "+2Car/+1", languages: "Común/elfico/+1", skills: "", tools: "", spells: "", extras: "" },
    { name: "Semielfo del bosque (zafa)", bonuses: "+2/+1/+1", languages: "Común/elfico/+1", skills: "", tools: "", spells: "", extras: "Dote adicional" },
    { name: "Semi Elfo Drow (costa de la espada)", bonuses: "+2Car/+1", languages: "Común/elfico/+1", skills: "", tools: "", spells: "Luces Danzantes int/car/sab, Fuego Feérico Niv-3 Int/car/sab, Oscuridad Niv-5 int/car/sab", extras: "" },
    { name: "Semi Elfo Drow (zafa)", bonuses: "+2/+1/+1", languages: "Común/elfico/+1", skills: "", tools: "", spells: "Luces Danzantes int/car/sab, Fuego Feérico Niv-3 Int/car/sab, Oscuridad Niv-5 int/car/sab", extras: "" },
    { name: "Semielfo Lunar (zafa)", bonuses: "+2/+1", languages: "Común/elfico/+1", skills: "", tools: "", spells: "", extras: "" },
    { name: "Semielfo Marino (costa de la espada)", bonuses: "+2Car/+1", languages: "Común/elfico/+1", skills: "", tools: "", spells: "", extras: "" },
    { name: "Semielfo Marino (zafa)", bonuses: "+2/+1", languages: "Común/elfico/+1", skills: "", tools: "", spells: "", extras: "" },
    { name: "Semielfo Solar (zafa)", bonuses: "+2/+1/+1", languages: "Común/elfico/+1", skills: "", tools: "", spells: "", extras: "" },
    { name: "Semielfo Solar/Lunar (Entrenamiento con armas élficas)", bonuses: "+2Car/+1", languages: "Común/elfico/+1", skills: "", tools: "", spells: "", extras: "" },
    { name: "Semielfo Solar/Lunar (Truco)", bonuses: "+2Car/+1", languages: "Común/elfico/+1", skills: "", tools: "", spells: "Truco de mago a elección int", extras: "" },
    { name: "Semiorco", bonuses: "+2Fue/+1Con", languages: "Común/Orco", skills: "intimidar", tools: "", spells: "", extras: "" },
    { name: "Shadar-Kai", bonuses: "+2/+1", languages: "Común/+1", skills: "Percepción", tools: "", spells: "", extras: "" },
    { name: "Tabaxi", bonuses: "+2/+1", languages: "Común/+1", skills: "Percepción/ Sigilo", tools: "", spells: "", extras: "Garras de gato" },
    { name: "Thyn'kora", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "", extras: "Dote adicional Niv-1, Dote adicional Niv-2, Dote adicional Niv-3" },
    { name: "Tiefling", bonuses: "+2Car/+1Int", languages: "Común/Infernal", skills: "", tools: "", spells: "Taumaturgia int/car/sab, Represión Infernal Niv-3 Int/car/sab, Oscuridad Niv-5 int/car/sab", extras: "" },
    { name: "Tiefling Asmodeus", bonuses: "+2/+1", languages: "Común/Infernal", skills: "", tools: "", spells: "Taumaturgia int/car/sab, Represión Infernal Niv-3 Int/car/sab, Oscuridad Niv-5 int/car/sab", extras: "" },
    { name: "Tiefling Baalzebul", bonuses: "+2/+1", languages: "Común/Infernal", skills: "", tools: "", spells: "Taumaturgia int/car/sab, Rayo Debilitador Niv-3 Int/car/sab, Corona de la Lectura Niv-5 int/car/sab", extras: "" },
    { name: "Tiefling Dispater", bonuses: "+2/+1", languages: "Común/Infernal", skills: "", tools: "", spells: "Taumaturgia int/car/sab, Disfrazarse Niv-3 Int/car/sab, Detectar pensamientos Niv-5 int/car/sab", extras: "" },
    { name: "Tiefling Fierna", bonuses: "+2/+1", languages: "Común/Infernal", skills: "", tools: "", spells: "Amistad int/car/sab, Hechizar Persona Niv-3 Int/car/sab, Sugestión Niv-5 int/car/sab", extras: "" },
    { name: "Tiefling Glasya", bonuses: "+2/+1", languages: "Común/Infernal", skills: "", tools: "", spells: "Ilusion Menor int/car/sab, Disfrazarse Niv-3 Int/car/sab, Invisibilidad Niv-5 int/car/sab", extras: "" },
    { name: "Tiefling Levintus", bonuses: "+2/+1", languages: "Común/Infernal", skills: "", tools: "", spells: "Rayo de escarcha int/car/sab, Armadura de Agathys Niv-3 Int/car/sab, Oscuridad Niv-5 int/car/sab", extras: "" },
    { name: "Tiefling Mammon", bonuses: "+2/+1", languages: "Común/Infernal", skills: "", tools: "", spells: "Mano de mago int/car/sab, Disco flotante de Tenser Niv-3 Int/car/sab, Cerradura Niv-5 int/car/sab", extras: "" },
    { name: "Tiefling Mefistofeles", bonuses: "+2/+1", languages: "Común/Infernal", skills: "", tools: "", spells: "Mano de mago int/car/sab, Manos Ardientes Niv-3 Int/car/sab, Hoja de Fuego Niv-5 int/car/sab", extras: "" },
    { name: "Tiefling Variante", bonuses: "+2Des/+1Int", languages: "Común/Infernal", skills: "", tools: "", spells: "Dotes adicional", extras: "" },
    { name: "Tiefling Zariel", bonuses: "+2/+1", languages: "Común/Infernal", skills: "", tools: "", spells: "Taumaturgia int/car/sab, Castigo Abrasador Niv-3 Int/car/sab, Castigo Marcador Niv-5 int/car/sab", extras: "" },
    { name: "Tortoga", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "", extras: "CA 17 sin contar Destreza y no puede usar armadura" },
    { name: "Triton", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "Nube de Oscurocimiento int/car/sab, Rafaga de Viento Niv-3 Int/car/sab, Caminar sobre el agua Niv-5 int/car/sab", extras: "" },
    { name: "Vástago Oseo", bonuses: "+2/+1", languages: "Común/Habla Profunda", skills: "", tools: "", spells: "Sirviente Invisible", extras: "" },
    { name: "Vedalken", bonuses: "+2/+1", languages: "Común/+1", skills: "+1 escoger: Arc/His/Inter/Inve/JueM/Med", tools: "Escoger: entre todos", spells: "", extras: "" },
    { name: "Yuan-ti", bonuses: "+2/+1", languages: "Común/+1", skills: "", tools: "", spells: "Rociada Venenosa int/car/sab, Encantar animal Int/car/sab, Sugestión Niv-3 int/car/sab", extras: "" }
];

// Embedded data - Backgrounds
const backgroundsData = [
    { name: "Acolito", languages: "+2/", skills: "Perspicacia/Religion", tools: "", equipment: "Simbolo Sagrado", extras: "" },
    { name: "Agente de una faccion (Con Arcanos)", languages: "+2/", skills: "Arcanos/Perspicacia", tools: "", equipment: "", extras: "" },
    { name: "Agente de una faccion (Con Engañar)", languages: "+2/", skills: "Engañar/Perpicacia", tools: "", equipment: "", extras: "" },
    { name: "Agente de una faccion (Con Historia)", languages: "+2/", skills: "Historiar/Perpicacia", tools: "", equipment: "", extras: "" },
    { name: "Agente de una faccion (Con Interpretacion)", languages: "+2/", skills: "Interpretacion/Perpicacia", tools: "", equipment: "", extras: "" },
    { name: "Agente de una faccion (Con Intimidar)", languages: "+2/", skills: "Intimidar/Perpicacia", tools: "", equipment: "", extras: "" },
    { name: "Agente de una faccion (Con Investigacion)", languages: "+2/", skills: "Investigacion/Perpicacia", tools: "", equipment: "", extras: "" },
    { name: "Agente de una faccion (Con Medicina)", languages: "+2/", skills: "Medicina/Perpicacia", tools: "", equipment: "", extras: "" },
    { name: "Agente de una faccion (Con Naturalesa)", languages: "+2/", skills: "Naturaleza/Perpicacia", tools: "", equipment: "", extras: "" },
    { name: "Agente de una faccion (Con Percepcion)", languages: "+2/", skills: "Percepcion/Perpicacia", tools: "", equipment: "", extras: "" },
    { name: "Agente de una faccion (Con Persuacion)", languages: "+2/", skills: "Persuacion/Perpicacia", tools: "", equipment: "", extras: "" },
    { name: "Agente de una faccion (Con Religion)", languages: "+2/", skills: "Religion/Perpicacia", tools: "", equipment: "", extras: "" },
    { name: "Agente de una faccion (Con Supervivencia)", languages: "+2/", skills: "Supervivencia/Perpicacia", tools: "", equipment: "", extras: "" },
    { name: "Agente de una faccion (Con Trato con Animales)", languages: "+2/", skills: "Trato con animales/Perpicacia", tools: "", equipment: "", extras: "" },
    { name: "Artesano de Clan", languages: "+1/", skills: "Perpicacia/Historia", tools: "H. Artesano", equipment: "H. Artesano", extras: "" },
    { name: "Artesano Gremial", languages: "+1/", skills: "Perpicacia/Persuacion", tools: "H. Artesano", equipment: "H. Artesano", extras: "" },
    { name: "Artista", languages: "", skills: "Acrobacias/Interpretacion", tools: "kit de Disfraz/Intrumento", equipment: "Instrumento", extras: "" },
    { name: "Atormentado", languages: "+2/", skills: "+2 a Elegir: Arca/Inv/Rel/Super", tools: "", equipment: "Equipo de cazador de monstruso, Horror Trinket", extras: "" },
    { name: "Caballero de la Orden (Con Arcanos)", languages: "+1/", skills: "Arcanos/Persuacion", tools: "Instrumento o Set de juego", equipment: "", extras: "" },
    { name: "Caballero de la Orden (Con Historia)", languages: "+1/", skills: "Historia/Persuacion", tools: "Instrumento o Set de juego", equipment: "", extras: "" },
    { name: "Caballero de la Orden (Con Naturalesa)", languages: "+1/", skills: "Naturaleza/Persuacion", tools: "Instrumento o Set de juego", equipment: "", extras: "" },
    { name: "Caballero de la Orden (Con Religion)", languages: "+1/", skills: "Religion/Persuacion", tools: "Instrumento o Set de juego", equipment: "", extras: "" },
    { name: "Caza Recompensas urbano (Con Engañar y Perspicacia)", languages: "", skills: "Engañar/Perpicacia", tools: "H. Ladron/Set de Juego", equipment: "", extras: "" },
    { name: "Caza Recompensas urbano (Con Engañar y Persuacion)", languages: "", skills: "Engañar/Persuacion", tools: "H. Ladron/Set de Juego", equipment: "", extras: "" },
    { name: "Caza Recompensas urbano (Con Engañar y Sigilo)", languages: "", skills: "Engañar/Sigilo", tools: "H. Ladron/Set de Juego", equipment: "", extras: "" },
    { name: "Caza Recompensas urbano (Con Perspicacia y Persuacion)", languages: "", skills: "Perpicacia/Persuacion", tools: "H. Ladron/Set de Juego", equipment: "", extras: "" },
    { name: "Caza Recompensas urbano (Con Perspicacia y Sigilo)", languages: "", skills: "Perpicacia/Sigilo", tools: "H. Ladron/Set de Juego", equipment: "", extras: "" },
    { name: "Caza Recompensas urbano (Con Persuacion y Sigilo)", languages: "", skills: "Persuacion/Sigilo", tools: "H. Ladron/Set de Juego", equipment: "", extras: "" },
    { name: "Charlatan", languages: "", skills: "Engañar/Juego de Manos", tools: "Kit de Disfraz/Kit de Falsificacion", equipment: "Kit de Disfraz, Dado Cargado o Mazo de cartas marcadas", extras: "" },
    { name: "Cortesano", languages: "+2/", skills: "Perpicacis/Persuacion", tools: "", equipment: "", extras: "" },
    { name: "Criminal", languages: "", skills: "Engaño/Sigilo", tools: "Set de Juego/H. Ladron", equipment: "Palanqueta", extras: "" },
    { name: "Ermitaño", languages: "+1/", skills: "Medicina/Religion", tools: "Kit de Herborista", equipment: "Kit de Herborista", extras: "" },
    { name: "Erudito", languages: "+2/", skills: "Arcanos/Historia", tools: "", equipment: "Tinta negra y pluma", extras: "" },
    { name: "Erudito Enclaustado (Con Arcanos)", languages: "+2/", skills: "Arcanos/Historia", tools: "", equipment: "Tinta negra y pluma", extras: "" },
    { name: "Erudito Enclaustado (Con Naturaleza)", languages: "+2/", skills: "Naturaleza/Historia", tools: "", equipment: "Tinta negra y pluma", extras: "" },
    { name: "Erudito Enclaustado (Con Religion)", languages: "+2/", skills: "Religion/Historia", tools: "", equipment: "Tinta negra y pluma", extras: "" },
    { name: "Forastero Errante", languages: "+1/", skills: "Perpicacia/Percepcion", tools: "Instrumento o Set de Juegos", equipment: "Instrumento o Set de Juegos", extras: "" },
    { name: "Guardia de la Ciudad", languages: "+2/", skills: "Atletismo/Perpicacia", tools: "", equipment: "", extras: "" },
    { name: "Guardia de la Ciudad (Variante Investigador)", languages: "+2/", skills: "Investigacion/Perpicacia", tools: "", equipment: "", extras: "" },
    { name: "Heredero (Con Arcanos)", languages: "+1/", skills: "Arcanos/Supervivencia", tools: "Instrumento o Set de Juegos", equipment: "Instrumento o Set de Juegos", extras: "" },
    { name: "Heredero (Con Historia)", languages: "+1/", skills: "Historia/Supervivencia", tools: "Instrumento o Set de Juegos", equipment: "Instrumento o Set de Juegos", extras: "" },
    { name: "Heredero (Con Religion)", languages: "+1/", skills: "Religion/Supervivencia", tools: "Instrumento o Set de Juegos", equipment: "Instrumento o Set de Juegos", extras: "" },
    { name: "Heroe de Pueblo", languages: "", skills: "Trato con animales/Supervivencia", tools: "H. Artesano/Vehiculos (Terrestres)", equipment: "H. Artesano", extras: "" },
    { name: "Huerfano", languages: "", skills: "Juego de Manos/Sigilo", tools: "Kit de Disfraz/H. Ladron", equipment: "Rata", extras: "" },
    { name: "Investigador", languages: "", skills: "+2 a Elegir: Perspi/Inv/Percep", tools: "Kit de Disfraz/H. Ladron", equipment: "Lupa, Horror Trinket", extras: "" },
    { name: "Marinero", languages: "", skills: "Atletismo/Percepcion", tools: "H. Navegacion/Vehiculo (Acuatico)", equipment: "Garrote, Cuerda de Ceda", extras: "" },
    { name: "Mercenario Veterano", languages: "", skills: "Atletismo/Persuacion", tools: "Set de Juego/Vehiculo (Terrestre)", equipment: "Set de Juego", extras: "" },
    { name: "Miembro de la Tribu Uthgardt", languages: "+1/", skills: "Atletismo/Supervivencia", tools: "Instrumento o H. Artesano", equipment: "Trampa de Caza", extras: "" },
    { name: "Noble", languages: "+1/", skills: "Historia/Persuacion", tools: "Set de Juego", equipment: "", extras: "" },
    { name: "Noble Waterdeep", languages: "+1/", skills: "Historia/Persuacion", tools: "Set de Juego o Instrumento", equipment: "", extras: "" },
    { name: "Oriundo de la Luna", languages: "", skills: "Atletismo/Supervivencia", tools: "H. Navegante/Vehiculo Espacial", equipment: "", extras: "" },
    { name: "Salvaje", languages: "+1/", skills: "Atletismo/Supervivencia", tools: "Instrumento", equipment: "Baston, Trampa de Caza", extras: "" },
    { name: "Soldado", languages: "", skills: "Atletismo/Intimidacion", tools: "Set de Juego/Vehiculo (Terrestre)", equipment: "Daga, Dados o Naipes", extras: "" },
    { name: "Vagabundo Astral", languages: "+2/", skills: "Perspicacia/Religion", tools: "", equipment: "", extras: "" }
];

// Embedded data - Classes
const classesData = [
    { name: "Artifice", equipment: "-2 armas sencillas a tu eleccion\n-Una ballesta ligera y 20 virotes\n-Una armadura de cuero tachonado O una cota de malla\n-Herramientas de Ladron Y un paquete de mazmorras", hitDie: "d8", spells: "", languages: "" },
    { name: "Barbaro", equipment: "-Una hacha a dos manos O cualquier arma cuerpo a cuerpo marcial\n-Dos hachas de manos O cualquier arma sencilla\n-Un paquete de explorador y 4 jabalinas", hitDie: "d12", spells: "", languages: "" },
    { name: "Bardo", equipment: "-Un estoque O una espada larga O cualquier arma sencilla\n-Un paquete diplomatico O un paquete de artista\n-Un laud O cualquier otro instrumento musical\n-Armadura de cuero Y una daga", hitDie: "d8", spells: "", languages: "" },
    { name: "Brujo", equipment: "-Una ballesta ligera y 20 virotes O cualquier otra arma sencilla\n-Un saquito de componentes O un canalizador arcano\n-Un paquete de erudito O paquete de explorador de mazmorras\n-Armadura de cuero, cualquier arma sencilla Y dos dagas", hitDie: "d8", spells: "", languages: "" },
    { name: "Clerigo", equipment: "-Una maza O un martillo de guerra (si eres competente)\n-Una cota de escamas O una armadura de cuero O una cota de malla (si eres competente)\n-Una ballesta ligera y 20 virotes O cualquier arma sencilla\n-Un paquete de sacerdote O un paquete de explorador\n-Un escudo y un simbolo sagrado", hitDie: "d8", spells: "", languages: "" },
    { name: "Druida", equipment: "-Escudo de madera O cualquier arma sencilla\n-Una cimitarra O cualquier arma cuerpo a cuerpo sencilla\n-Armadura de cuero, paquete de explorador Y canalizador druidico", hitDie: "d8", spells: "", languages: "" },
    { name: "Explorador", equipment: "-Una cota de escamas O una armadura de cuero\n-Dos espadas cortas O dos armas cuerpo a cuerpo sencillas\n-Un paquete de explorador de mazmorras O un paquete de explorador\n-Un arco largo y una aljiba con 20 flechas", hitDie: "d10", spells: "", languages: "" },
    { name: "Guerrero", equipment: "A elegir entre: (a) un arma marcial a tu elección y un escudo o (b) dos armas marciales a tu elección.\nA elegir entre: (a) cinco jabalinas o (b) un arma sencilla cuerpo a cuerpo a tu elección.\nA elegir entre: (a) un paquete de sacerdote o (b) un paquete de explorador.\nCota de mallas y símbolo sagrado (especificar).", hitDie: "d10", spells: "No tiene", languages: "" },
    { name: "Hechicero", equipment: "No especificado", hitDie: "d6", spells: "3 trucos, 6 conjuros conocidos, 1 + inteligencia de conjuros preparados", languages: "" },
    { name: "Mago", equipment: "No especificado", hitDie: "d6", spells: "3 trucos, 6 conjuros conocidos, 1 + inteligencia de conjuros preparados", languages: "" },
    { name: "Monje", equipment: "A elegir entre: (a) una espada corta o (b) un arma sencilla a tu elección.\nA elegir entre: (a) un paquete de explorador de mazmorras o (b) un paquete de explorador.\n10 dardos.", hitDie: "d8", spells: "No tiene", languages: "" },
    { name: "Paladin", equipment: "A elegir entre: (a) un arma marcial a tu elección y un escudo o (b) dos armas marciales a tu elección.\nA elegir entre: (a) cinco jabalinas o (b) un arma sencilla cuerpo a cuerpo a tu elección.\nA elegir entre: (a) un paquete de sacerdote o (b) un paquete de explorador.\nCota de mallas y símbolo sagrado (especificar).", hitDie: "d10", spells: "No tiene", languages: "" },
    { name: "Picaro", equipment: "A elegir entre: (a) una espada corta o (b) un estoque.\nA elegir entre: (a) un arco corto y un carcaj con 20 flechas o (b) una espada corta.\nA elegir entre: (a) un paquete de ladrón, (b) un paquete de explorador de mazmorras o (c) un paquete de explorador.\nArmadura de cuero, dos dagas y herramientas de ladrón.", hitDie: "d8", spells: "No tiene", languages: "" },
    { name: "Pugilista", equipment: "(a) Una armadura de cuero O (b) cualquier arma simple.\n(a) Un pack de explorador O (b) un pack de saqueador de mazmorras.", hitDie: "d8", spells: "", languages: "" }
];

// All available languages for selection
const allLanguages = [
    'Común', 'Élfico', 'Enano', 'Dracónido', 'Infernal', 'Orco', 'Gnomo', 
    'Silvano', 'Infra Común', 'Habla Profunda', 'Primordial', 'Gigante', 
    'Auran', 'Ignan', 'Terran', 'Aquán', 'Suelo', 'Celestial', 'Abyssal'
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadProgress();
});

// Setup event listeners
function setupEventListeners() {
    // Start button
    document.getElementById('startButton').addEventListener('click', startWizard);
    
    // Phase 1
    document.getElementById('raceSearch').addEventListener('input', filterRaces);
    document.getElementById('phase1Back').addEventListener('click', () => goToPhase(0));
    document.getElementById('phase1Next').addEventListener('click', () => goToPhase(2));
    
    // Phase 2
    document.getElementById('phase2Back').addEventListener('click', () => goToPhase(1));
    document.getElementById('phase2Next').addEventListener('click', () => goToPhase(3));
    
    // Phase 3
    document.getElementById('backgroundSearch').addEventListener('input', filterBackgrounds);
    document.getElementById('phase3Back').addEventListener('click', () => goToPhase(2));
    document.getElementById('phase3Next').addEventListener('click', () => goToPhase(4));
    
    // Phase 4
    document.getElementById('phase4Back').addEventListener('click', () => goToPhase(3));
    document.getElementById('phase4Next').addEventListener('click', () => goToPhase(5));
    
    // Phase 5
    document.getElementById('phase5Back').addEventListener('click', () => goToPhase(4));
    document.getElementById('phase5Next').addEventListener('click', () => goToPhase(6));
    
    // Phase 6
    document.getElementById('phase6Back').addEventListener('click', () => goToPhase(5));
    document.getElementById('restartButton').addEventListener('click', restartWizard);
}

// Start the wizard
function startWizard() {
    document.getElementById('heroSection').classList.add('hidden');
    document.getElementById('wizardContainer').classList.remove('hidden');
    renderRaces();
    goToPhase(1);
}

// Go to specific phase
function goToPhase(phaseNumber) {
    // Hide all phases
    document.querySelectorAll('.phase-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show current phase
    const phaseMap = {
        0: null,
        1: 'phase1',
        2: 'phase2',
        3: 'phase3',
        4: 'phase4',
        5: 'phase5',
        6: 'phase6'
    };
    
    if (phaseMap[phaseNumber]) {
        document.getElementById(phaseMap[phaseNumber]).classList.remove('hidden');
    }
    
    // Update progress bar
    const progress = (phaseNumber / 6) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Fase ${phaseNumber} de 6`;
    
    characterState.currentPhase = phaseNumber;
    
    // Render phase-specific content
    switch(phaseNumber) {
        case 2:
            renderClasses();
            break;
        case 3:
            renderBackgrounds();
            break;
        case 4:
            renderLanguages();
            break;
        case 5:
            renderEquipment();
            break;
        case 6:
            renderFinalSummary();
            break;
    }
    
    saveProgress();
}

// Render races grid
function renderRaces(filter = '') {
    const grid = document.getElementById('raceGrid');
    grid.innerHTML = '';
    
    const filteredRaces = racesData.filter(race => 
        race.name.toLowerCase().includes(filter.toLowerCase())
    );
    
    filteredRaces.forEach(race => {
        const card = document.createElement('div');
        card.className = 'bg-bg-card border border-violet-primary/20 rounded-lg p-4 cursor-pointer hover:border-violet-primary/50 transition-all';
        card.innerHTML = `
            <h3 class="font-title text-lg text-violet-soft mb-2">${race.name}</h3>
            <p class="text-sm text-silver-soft">${race.bonuses}</p>
        `;
        card.addEventListener('click', () => selectRace(race));
        grid.appendChild(card);
    });
}

// Filter races
function filterRaces(e) {
    renderRaces(e.target.value);
}

// Select race
function selectRace(race) {
    characterState.race = race;
    
    // Update UI
    document.querySelectorAll('#raceGrid > div').forEach(card => {
        card.classList.remove('border-violet-primary', 'bg-violet-primary/10');
        if (card.querySelector('h3').textContent === race.name) {
            card.classList.add('border-violet-primary', 'bg-violet-primary/10');
        }
    });
    
    // Show details
    const details = document.getElementById('raceDetails');
    details.classList.remove('hidden');
    document.getElementById('selectedRaceName').textContent = race.name;
    
    let infoHtml = `
        <div class="bg-bg-card rounded-lg p-4">
            <h4 class="font-title text-lg text-violet-bright mb-2">Bonificadores</h4>
            <p class="text-silver-soft">${race.bonuses}</p>
        </div>
    `;
    
    if (race.languages && race.languages !== 'No permitido') {
        infoHtml += `
            <div class="bg-bg-card rounded-lg p-4">
                <h4 class="font-title text-lg text-violet-bright mb-2">Idiomas</h4>
                <p class="text-silver-soft">${race.languages}</p>
            </div>
        `;
    }
    
    if (race.skills && race.skills !== 'No permitido') {
        infoHtml += `
            <div class="bg-bg-card rounded-lg p-4">
                <h4 class="font-title text-lg text-violet-bright mb-2">Competencias de Habilidad</h4>
                <p class="text-silver-soft">${race.skills}</p>
            </div>
        `;
    }
    
    if (race.tools && race.tools !== 'No permitido') {
        infoHtml += `
            <div class="bg-bg-card rounded-lg p-4">
                <h4 class="font-title text-lg text-violet-bright mb-2">Competencias de Herramientas</h4>
                <p class="text-silver-soft">${race.tools}</p>
            </div>
        `;
    }
    
    if (race.spells && race.spells !== 'No permitido') {
        infoHtml += `
            <div class="bg-bg-card rounded-lg p-4">
                <h4 class="font-title text-lg text-violet-bright mb-2">Conjuros Raciales</h4>
                <p class="text-silver-soft">${race.spells}</p>
            </div>
        `;
    }
    
    if (race.extras && race.extras !== 'No permitido') {
        infoHtml += `
            <div class="bg-bg-card rounded-lg p-4">
                <h4 class="font-title text-lg text-violet-bright mb-2">Extras</h4>
                <p class="text-silver-soft">${race.extras}</p>
            </div>
        `;
    }
    
    document.getElementById('raceInfo').innerHTML = infoHtml;
    document.getElementById('phase1Next').disabled = false;
}

// Render classes grid
function renderClasses() {
    const grid = document.getElementById('classGrid');
    grid.innerHTML = '';
    
    classesData.forEach(cls => {
        const card = document.createElement('div');
        card.className = 'bg-bg-card border border-violet-primary/20 rounded-lg p-4 cursor-pointer hover:border-violet-primary/50 transition-all';
        card.innerHTML = `
            <h3 class="font-title text-lg text-violet-soft mb-2">${cls.name}</h3>
            <p class="text-sm text-silver-soft">${cls.equipment ? 'Equipo inicial disponible' : 'Equipo no especificado'}</p>
        `;
        card.addEventListener('click', () => selectClass(cls));
        grid.appendChild(card);
    });
}

// Select class
function selectClass(cls) {
    characterState.class = cls;
    
    // Update UI
    document.querySelectorAll('#classGrid > div').forEach(card => {
        card.classList.remove('border-violet-primary', 'bg-violet-primary/10');
        if (card.querySelector('h3').textContent === cls.name) {
            card.classList.add('border-violet-primary', 'bg-violet-primary/10');
        }
    });
    
    // Show details
    const details = document.getElementById('classDetails');
    details.classList.remove('hidden');
    document.getElementById('selectedClassName').textContent = cls.name;
    
    let infoHtml = `
        <div class="bg-bg-card rounded-lg p-4">
            <h4 class="font-title text-lg text-violet-bright mb-2">Dado de Golpe (Nivel 1)</h4>
            <p class="text-silver-soft">${cls.hitDie}</p>
        </div>
    `;
    
    if (cls.equipment && cls.equipment !== 'No especificado') {
        infoHtml += `
            <div class="bg-bg-card rounded-lg p-4">
                <h4 class="font-title text-lg text-violet-bright mb-2">Equipo Inicial</h4>
                <p class="text-silver-soft whitespace-pre-line">${cls.equipment}</p>
            </div>
        `;
    }
    
    if (cls.spells && cls.spells !== 'No especificado') {
        infoHtml += `
            <div class="bg-bg-card rounded-lg p-4">
                <h4 class="font-title text-lg text-violet-bright mb-2">Conjuros Iniciales</h4>
                <p class="text-silver-soft">${cls.spells}</p>
            </div>
        `;
    }
    
    document.getElementById('classInfo').innerHTML = infoHtml;
    document.getElementById('phase2Next').disabled = false;
}

// Render backgrounds grid
function renderBackgrounds(filter = '') {
    const grid = document.getElementById('backgroundGrid');
    grid.innerHTML = '';
    
    const filteredBackgrounds = backgroundsData.filter(bg => 
        bg.name.toLowerCase().includes(filter.toLowerCase())
    );
    
    filteredBackgrounds.forEach(bg => {
        const card = document.createElement('div');
        card.className = 'bg-bg-card border border-violet-primary/20 rounded-lg p-4 cursor-pointer hover:border-violet-primary/50 transition-all';
        card.innerHTML = `
            <h3 class="font-title text-lg text-violet-soft mb-2">${bg.name}</h3>
            <p class="text-sm text-silver-soft">${bg.skills}</p>
        `;
        card.addEventListener('click', () => selectBackground(bg));
        grid.appendChild(card);
    });
}

// Filter backgrounds
function filterBackgrounds(e) {
    renderBackgrounds(e.target.value);
}

// Select background
function selectBackground(bg) {
    characterState.background = bg;
    
    // Update UI
    document.querySelectorAll('#backgroundGrid > div').forEach(card => {
        card.classList.remove('border-violet-primary', 'bg-violet-primary/10');
        if (card.querySelector('h3').textContent === bg.name) {
            card.classList.add('border-violet-primary', 'bg-violet-primary/10');
        }
    });
    
    // Show details
    const details = document.getElementById('backgroundDetails');
    details.classList.remove('hidden');
    document.getElementById('selectedBackgroundName').textContent = bg.name;
    
    let infoHtml = '';
    
    if (bg.skills) {
        infoHtml += `
            <div class="bg-bg-card rounded-lg p-4">
                <h4 class="font-title text-lg text-violet-bright mb-2">Competencias de Habilidad</h4>
                <p class="text-silver-soft">${bg.skills}</p>
            </div>
        `;
    }
    
    if (bg.tools) {
        infoHtml += `
            <div class="bg-bg-card rounded-lg p-4">
                <h4 class="font-title text-lg text-violet-bright mb-2">Competencias de Herramientas</h4>
                <p class="text-silver-soft">${bg.tools}</p>
            </div>
        `;
    }
    
    if (bg.equipment) {
        infoHtml += `
            <div class="bg-bg-card rounded-lg p-4">
                <h4 class="font-title text-lg text-violet-bright mb-2">Equipo Añadido</h4>
                <p class="text-silver-soft">${bg.equipment}</p>
            </div>
        `;
    }
    
    if (bg.languages) {
        infoHtml += `
            <div class="bg-bg-card rounded-lg p-4">
                <h4 class="font-title text-lg text-violet-bright mb-2">Idiomas</h4>
                <p class="text-silver-soft">${bg.languages}</p>
            </div>
        `;
    }
    
    document.getElementById('backgroundInfo').innerHTML = infoHtml;
    document.getElementById('phase3Next').disabled = false;
}

// Parse languages from race, class, and background
function parseLanguages() {
    let languages = [];
    let additionalCount = 0;
    
    // Race languages
    if (characterState.race && characterState.race.languages) {
        const raceLangs = characterState.race.languages;
        if (raceLangs.includes('+')) {
            const parts = raceLangs.split('/');
            parts.forEach(part => {
                if (part.includes('+')) {
                    const count = parseInt(part.replace('+', '').trim());
                    additionalCount += count;
                } else {
                    languages.push(part.trim());
                }
            });
        } else {
            raceLangs.split('/').forEach(lang => languages.push(lang.trim()));
        }
    }
    
    // Background languages
    if (characterState.background && characterState.background.languages) {
        const bgLangs = characterState.background.languages;
        if (bgLangs.includes('+')) {
            const parts = bgLangs.split('/');
            parts.forEach(part => {
                if (part.includes('+')) {
                    const count = parseInt(part.replace('+', '').trim());
                    additionalCount += count;
                }
            });
        }
    }
    
    return { languages, additionalCount };
}

// Render languages
function renderLanguages() {
    const { languages, additionalCount } = parseLanguages();
    characterState.languages = languages;
    
    const summary = document.getElementById('languagesSummary');
    
    let html = `
        <div class="bg-bg-card rounded-lg p-6">
            <h3 class="font-title text-xl text-violet-soft mb-4">Idiomas Obtenidos</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
    `;
    
    languages.forEach(lang => {
        if (lang && lang !== '') {
            html += `
                <div class="bg-bg-panel rounded-lg p-3 text-center">
                    <span class="text-silver-soft">${lang}</span>
                </div>
            `;
        }
    });
    
    html += `
            </div>
        </div>
    `;
    
    // Sources breakdown
    html += `
        <div class="bg-bg-card rounded-lg p-6">
            <h3 class="font-title text-xl text-violet-soft mb-4">Fuentes de Idiomas</h3>
            <div class="space-y-3">
    `;
    
    if (characterState.race && characterState.race.languages) {
        html += `
            <div class="bg-bg-panel rounded-lg p-3">
                <span class="text-violet-bright font-semibold">Raza (${characterState.race.name}):</span>
                <span class="text-silver-soft ml-2">${characterState.race.languages}</span>
            </div>
        `;
    }
    
    if (characterState.background && characterState.background.languages) {
        html += `
            <div class="bg-bg-panel rounded-lg p-3">
                <span class="text-violet-bright font-semibold">Trasfondo (${characterState.background.name}):</span>
                <span class="text-silver-soft ml-2">${characterState.background.languages}</span>
            </div>
        `;
    }
    
    html += `
            </div>
        </div>
    `;
    
    summary.innerHTML = html;
    
    // Additional languages selection
    if (additionalCount > 0) {
        const additionalSection = document.getElementById('additionalLanguagesSection');
        additionalSection.classList.remove('hidden');
        document.getElementById('additionalLanguagesCount').textContent = additionalCount;
        
        const grid = document.getElementById('additionalLanguagesGrid');
        grid.innerHTML = '';
        
        allLanguages.forEach(lang => {
            if (!languages.includes(lang)) {
                const btn = document.createElement('button');
                btn.className = 'bg-bg-card border border-violet-primary/20 rounded-lg p-3 text-silver-soft hover:border-violet-primary hover:bg-violet-primary/10 transition-all';
                btn.textContent = lang;
                btn.addEventListener('click', () => toggleAdditionalLanguage(lang, btn, additionalCount));
                grid.appendChild(btn);
            }
        });
    } else {
        document.getElementById('additionalLanguagesSection').classList.add('hidden');
    }
}

// Toggle additional language selection
function toggleAdditionalLanguage(lang, btn, maxCount) {
    const index = characterState.additionalLanguages.indexOf(lang);
    
    if (index > -1) {
        characterState.additionalLanguages.splice(index, 1);
        btn.classList.remove('border-violet-primary', 'bg-violet-primary/10');
    } else {
        if (characterState.additionalLanguages.length < maxCount) {
            characterState.additionalLanguages.push(lang);
            btn.classList.add('border-violet-primary', 'bg-violet-primary/10');
        }
    }
}

// Parse equipment
function parseEquipment() {
    let equipment = [];
    let choices = [];
    
    // Class equipment
    if (characterState.class && characterState.class.equipment) {
        const classEquip = characterState.class.equipment;
        const lines = classEquip.split('\n').filter(line => line.trim());
        
        lines.forEach(line => {
            if (line.includes('O')) {
                // This is a choice
                const parts = line.split('O');
                choices.push({
                    source: 'Clase',
                    options: parts.map(p => p.replace(/^-/, '').trim())
                });
            } else if (line.includes('Y')) {
                // Both items
                const parts = line.split('Y');
                parts.forEach(p => {
                    const item = p.replace(/^-/, '').trim();
                    if (item) equipment.push({ item, source: 'Clase' });
                });
            } else {
                const item = line.replace(/^-/, '').trim();
                if (item) equipment.push({ item, source: 'Clase' });
            }
        });
    }
    
    // Background equipment
    if (characterState.background && characterState.background.equipment) {
        const bgEquip = characterState.background.equipment;
        const items = bgEquip.split(',').map(i => i.trim()).filter(i => i);
        items.forEach(item => {
            equipment.push({ item, source: 'Trasfondo' });
        });
    }
    
    return { equipment, choices };
}

// Render equipment
function renderEquipment() {
    const { equipment, choices } = parseEquipment();
    
    const summary = document.getElementById('equipmentSummary');
    let html = '';
    
    // Automatic equipment
    if (equipment.length > 0) {
        html += `
            <div class="bg-bg-card rounded-lg p-6">
                <h3 class="font-title text-xl text-violet-soft mb-4">Equipo Automático</h3>
                <div class="space-y-2">
        `;
        
        equipment.forEach(eq => {
            html += `
                <div class="bg-bg-panel rounded-lg p-3 flex justify-between items-center">
                    <span class="text-silver-soft">${eq.item}</span>
                    <span class="text-xs text-violet-bright">${eq.source}</span>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    }
    
    // Equipment choices
    if (choices.length > 0) {
        choices.forEach((choice, index) => {
            html += `
                <div class="bg-bg-card rounded-lg p-6">
                    <h3 class="font-title text-xl text-violet-soft mb-4">Elección de Equipo - ${choice.source}</h3>
                    <p class="text-silver-soft mb-4">Elige una opción:</p>
                    <div class="space-y-3">
            `;
            
            choice.options.forEach((option, optIndex) => {
                const letter = String.fromCharCode(65 + optIndex);
                html += `
                    <button class="equipment-choice-btn w-full bg-bg-panel border border-violet-primary/20 rounded-lg p-4 text-left hover:border-violet-primary transition-all" data-choice="${index}" data-option="${optIndex}">
                        <span class="font-bold text-violet-bright">${letter}.</span> <span class="text-silver-soft">${option}</span>
                    </button>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        });
        
        // Add event listeners to choice buttons
        setTimeout(() => {
            document.querySelectorAll('.equipment-choice-btn').forEach(btn => {
                btn.addEventListener('click', handleEquipmentChoice);
            });
        }, 100);
    }
    
    if (!html) {
        html = `
            <div class="bg-bg-card rounded-lg p-6">
                <p class="text-silver-soft">No hay equipo especificado para esta combinación.</p>
            </div>
        `;
    }
    
    summary.innerHTML = html;
}

// Handle equipment choice
function handleEquipmentChoice(e) {
    const btn = e.currentTarget;
    const choiceIndex = parseInt(btn.dataset.choice);
    const optionIndex = parseInt(btn.dataset.option);
    
    // Clear previous selection for this choice
    btn.parentElement.querySelectorAll('.equipment-choice-btn').forEach(b => {
        b.classList.remove('border-violet-primary', 'bg-violet-primary/10');
    });
    
    // Select current
    btn.classList.add('border-violet-primary', 'bg-violet-primary/10');
    
    // Store choice
    characterState.equipmentChoices[choiceIndex] = optionIndex;
}

// Render final summary
function renderFinalSummary() {
    const summary = document.getElementById('finalSummary');
    
    // Combine all languages
    const allLanguagesList = [...characterState.languages, ...characterState.additionalLanguages];
    
    // Get selected equipment
    const { equipment, choices } = parseEquipment();
    let finalEquipment = [...equipment];
    
    // Add chosen equipment
    choices.forEach((choice, index) => {
        const selectedOption = characterState.equipmentChoices[index];
        if (selectedOption !== undefined) {
            finalEquipment.push({
                item: choice.options[selectedOption],
                source: choice.source + ' (Elección)'
            });
        }
    });
    
    let html = `
        <div class="bg-bg-card rounded-lg p-6">
            <h3 class="font-title text-xl text-violet-soft mb-4">Raza</h3>
            <p class="text-silver-soft text-lg">${characterState.race ? characterState.race.name : 'No seleccionada'}</p>
            ${characterState.race && characterState.race.bonuses ? `<p class="text-sm text-silver-soft mt-2">${characterState.race.bonuses}</p>` : ''}
        </div>
        
        <div class="bg-bg-card rounded-lg p-6">
            <h3 class="font-title text-xl text-violet-soft mb-4">Clase</h3>
            <p class="text-silver-soft text-lg">${characterState.class ? characterState.class.name : 'No seleccionada'}</p>
            ${characterState.class ? `<p class="text-sm text-silver-soft mt-2">Dado de Golpe: ${characterState.class.hitDie}</p>` : ''}
        </div>
        
        <div class="bg-bg-card rounded-lg p-6">
            <h3 class="font-title text-xl text-violet-soft mb-4">Trasfondo</h3>
            <p class="text-silver-soft text-lg">${characterState.background ? characterState.background.name : 'No seleccionado'}</p>
        </div>
        
        <div class="bg-bg-card rounded-lg p-6">
            <h3 class="font-title text-xl text-violet-soft mb-4">Idiomas</h3>
            <div class="flex flex-wrap gap-2">
    `;
    
    allLanguagesList.forEach(lang => {
        html += `<span class="bg-bg-panel rounded-lg px-3 py-1 text-silver-">${lang}</span>`;
    });
    
    html += `
            </div>
        </div>
        
        <div class="bg-bg-card rounded-lg p-6">
            <h3 class="font-title text-xl text-violet-soft mb-4">Equipo</h3>
            <div class="space-y-2">
    `;
    
    finalEquipment.forEach(eq => {
        html += `
            <div class="bg-bg-panel rounded-lg p-3">
                <span class="text-silver-soft">${eq.item}</span>
                <span class="text-xs text-violet-bright ml-2">(${eq.source})</span>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    // Spells if applicable
    if (characterState.race && characterState.race.spells && characterState.race.spells !== 'No permitido') {
        html += `
            <div class="bg-bg-card rounded-lg p-6">
                <h3 class="font-title text-xl text-violet-soft mb-4">Conjuros Raciales</h3>
                <p class="text-silver-soft">${characterState.race.spells}</p>
            </div>
        `;
    }
    
    summary.innerHTML = html;
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('characterCreationState', JSON.stringify(characterState));
}

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('characterCreationState');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed.currentPhase > 0) {
                characterState = parsed;
                // Restore UI state
                document.getElementById('heroSection').classList.add('hidden');
                document.getElementById('wizardContainer').classList.remove('hidden');
                goToPhase(characterState.currentPhase);
            }
        } catch (e) {
            console.error('Error loading progress:', e);
        }
    }
}

// Restart wizard
function restartWizard() {
    localStorage.removeItem('characterCreationState');
    characterState = {
        race: null,
        class: null,
        background: null,
        languages: [],
        additionalLanguages: [],
        equipment: [],
        equipmentChoices: {},
        currentPhase: 0
    };
    
    document.getElementById('heroSection').classList.remove('hidden');
    document.getElementById('wizardContainer').classList.add('hidden');
    document.getElementById('raceDetails').classList.add('hidden');
    document.getElementById('classDetails').classList.add('hidden');
    document.getElementById('backgroundDetails').classList.add('hidden');
    document.getElementById('phase1Next').disabled = true;
    document.getElementById('phase2Next').disabled = true;
    document.getElementById('phase3Next').disabled = true;
}
