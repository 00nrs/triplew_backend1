//Archivo que escribe las casillas en formatos diccionarios para la seed

const fs = require('fs');

const enabled_boxes = [
    "H1", "Q1", 
    "H2", "I2", "P2", "Q2", 
    "H3", "I3", "P3", "Q3", 
    "F4", "H4", "I4", "P4", "Q4", 
    "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5", "J5", "P5", "Q5", 
    "A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6", "P6", "Q6", "S6",
    "G7", "H7", "I7", "M7", "P7", "Q7", "R7", "S7", "T7", "U7", "V7", "W7",
    "H8", "I8", "J8", "K8", "L8", "M8", "N8", "O8", "P8", "Q8", "R8", "S8", "T8", "U8", "V8", "W8", "X8",
    "G9", "H9", "I9", "J9", "K9", "L9", "M9", "N9", "O9", "P9", "Q9", "R9", "S9", "T9", "U9", "V9", "W9",
    "H10", "I10", "J10", "K10", "L10", "M10", "N10", "O10", "P10", "R10",
    "C11", "G11", "H11", "I11", "J11", "K11", "L11", "M11", "N11", "O11", "P11", "Q11",
    "A12", "B12", "C12", "D12", "E12", "F12", "G12", "H12", "I12", "J12", "K12", "L12", "M12", "N12", "O12", "P12",
    "G13", "H13", "I13", "J13", "K13", "L13", "M13", "N13", "O13", "P13",
    "G14", "H14", "I14", "J14", "K14", "L14", "M14", "N14", "O14", "P14",
    "G15", "H15", "I15", "J15", "K15", "L15", "M15", "N15", "O15", "P15",
    "G16", "H16", "I16", "J16", "K16", "L16", "M16", "N16", "O16", "P16",
    "D17", "G17", "H17", "I17", "J17", "K17", "L17", "M17", "N17", "O17", "P17", "Q17", "R17", "S17", "U17",
    "B18", "C18", "D18", "E18", "F18", "G18", "H18", "I18", "J18", "K18", "L18", "M18", "N18", "O18", "P18", "Q18", "R18", "S18", "T18", "U18", "V18", "W18", "X18",
    "A19", "B19", "C19", "D19", "E19", "F19", "G19", "H19", "J19", "O19", "Q19", "R19", "S19", "T19", "U19", "V19", "W19", "X19",
    "B20", "F20", "G20", "H20", "Q20", "R20", "T20",
    "G21", "H21", "I21", "P21", "Q21", "R21",
    "F22", "G22", "H22", "Q22", "R22",
    "G23", "H23", "Q23", "R23",
    "G24", "H24", "Q24", "R24",
    "G25", "H25", "I25", "J25", "O25", "P25", "Q25", "R25",
    ]
    
    const entries = {
      "F4": 1,
      "J5": 2,
      "S6": 3,
      "L7": 2,
      "M7": 2,
      "G9": 4,
      "R10": 9,
      "C11": 4,
      "Q11": 9,
      "D17": 5,
      "U17": 9,
      "J19": 7,
      "O19": 7,
      "B20": 6,
      "T20": 8,
      "I21": 7,
      "P21": 7,
      "F22": 6
    }

    const pool = [
        "J9", "K9", "L9", "M9", "N9",
        "J10", "K10", "L10", "M10", "N10",
        "J11", "K11", "L11", "M11", "N11",
        "J12", "K12", "L12", "M12", "N12",
        "J13", "K13", "L13", "M13", "N13",
        "J14", "K14", "L14", "M14", "N14",
        "J15", "K15", "L15", "M15", "N15",
        "J16", "K16", "L16", "M16", "N16",
    ]

const generateDictionary = () => {
    const dictionaries = [];
    //let roomID = null;
    enabled_boxes.forEach(coordinate => {
        if (entries[coordinate]){
            const dict = {
                type: null,
                coordinate,
                roomID: entries[coordinate],
                createdAt: "new Date()",
                updatedAt: "new Date()",
            };
            dictionaries.push(dict);
        }
        else if(pool.includes(coordinate)){
            const dict = {
                type: "center",
                coordinate,
                roomID: null,
                createdAt: "new Date()",
                updatedAt: "new Date()",
            };
            dictionaries.push(dict);
        }
        else{
           const dict = {
            type: null,
            coordinate,
            roomID: null,
            createdAt: "new Date()",
            updatedAt: "new Date()",
            };
        dictionaries.push(dict);
        }
    });
    return dictionaries;
};
    
const dictionaries = generateDictionary();
const jsCode = `module.exports = [${dictionaries.map(obj => {
    return `{\ntype: ${obj.type},\n coordinate: "${obj.coordinate}",\n roomID: ${obj.roomID},\n createdAt: ${obj.createdAt},\n updatedAt: ${obj.updatedAt}\n}`;
}).join(',\n')}];`;
    
    // Escribir el código JavaScript en un archivo
    fs.writeFileSync('dictionaries.js', jsCode, 'utf8');
    
    console.log('Se han escrito los diccionarios en dictionaries.js');