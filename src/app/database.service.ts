import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { MessageService } from './message.service';
import { Http } from '@angular/http';

@Injectable()
export class DatabaseService {
    constructor(private messageService: MessageService, private http: Http){
 }
    sendMessage(Message): void { this.messageService.sendMessage(Message);}
    clearMessage(): void {this.messageService.clearMessage(); }
    
    public colors = {
        "0": "#000000", "1": "#C0C0C0", "2": "#808080", "3": "#808080", "4": "#FFFFFF", "5": "#800000", "6": "#FF0000", "7": "#800080", "8": "#FF00FF", "9": "#008000", "10": "#00FF00", "11": "#808000", "12": "#FFFF00", "13": "#000080", "14": "#0000FF", "15": "#008080", "16": "#00FFFF", "17": "#00008B", "18": "#0000CD", "19": "#006400", "20": "#008B8B", "21": "#00BFFF", "22": "#00CED1", "23": "#00FA9A", "24": "#00FF7F", "25": "#00FFFF", "26": "#191970", "27": "#1E90FF", "28": "#20B2AA", "29": "#228B22", "30": "#2E8B57", "31": "#2F4F4F", "32": "#2F4F4F", "33": "#32CD32", "34": "#3CB371", "35": "#40E0D0", "36": "#4169E1", "37": "#4682B4", "38": "#483D8B", "39": "#48D1CC", "40": "#4B0082", "41": "#556B2F", "42": "#5F9EA0", "43": "#6495ED", "44": "#663399", "45": "#66CDAA", "46": "#696969", "47": "#696969", "48": "#6A5ACD", "49": "#6B8E23", "50": "#708090", "51": "#708090", "52": "#778899", "53": "#778899", "54": "#7B68EE", "55": "#7CFC00", "56": "#7FFF00", "57": "#7FFFD4", "58": "#87CEEB", "59": "#87CEFA", "60": "#8A2BE2", "61": "#8B0000", "62": "#8B008B", "63": "#8B4513", "64": "#8FBC8F", "65": "#90EE90", "66": "#9370DB", "67": "#9400D3", "68": "#98FB98", "69": "#9932CC", "70": "#9ACD32", "71": "#A0522D", "72": "#A52A2A", "73": "#A9A9A9", "74": "#A9A9A9", "75": "#ADD8E6", "76": "#ADFF2F", "77": "#AFEEEE", "78": "#B0C4DE", "79": "#B0E0E6", "80": "#B22222", "81": "#B8860B", "82": "#BA55D3", "83": "#BC8F8F", "84": "#BDB76B", "85": "#C71585", "86": "#CD5C5C", "87": "#CD853F", "88": "#D2691E", "89": "#D2B48C", "90": "#D3D3D3", "91": "#D3D3D3", "92": "#D8BFD8", "93": "#DA70D6", "94": "#DAA520", "95": "#DB7093", "96": "#DC143C", "97": "#DCDCDC", "98": "#DDA0DD", "99": "#DEB887", "100": "#E0FFFF", "101": "#E6E6FA", "102": "#E9967A", "103": "#EE82EE", "104": "#EEE8AA", "105": "#F08080", "106": "#F0E68C", "107": "#F0F8FF", "108": "#F0FFF0", "109": "#F0FFFF", "110": "#F4A460", "111": "#F5DEB3", "112": "#F5F5DC", "113": "#F5F5F5", "114": "#F5FFFA", "115": "#F8F8FF", "116": "#FA8072", "117": "#FAEBD7", "118": "#FAF0E6", "119": "#FAFAD2", "120": "#FDF5E6", "121": "#FF00FF", "122": "#FF1493", "123": "#FF4500", "124": "#FF6347", "125": "#FF69B4", "126": "#FF7F50", "127": "#FF8C00", "128": "#FFA07A", "129": "#FFA500", "130": "#FFB6C1", "131": "#FFC0CB", "132": "#FFD700", "133": "#FFDAB9", "134": "#FFDEAD", "135": "#FFE4B5", "136": "#FFE4C4", "137": "#FFE4E1", "138": "#FFEBCD", "139": "#FFEFD5", "140": "#FFF0F5", "141": "#FFF5EE", "142": "#FFF8DC", "143": "#FFFACD", "144": "#FFFAF0", "145": "#FFFAFA", "146": "#FFFFE0", "147": "#FFFFF0"
      }
    
    public viewpoint={
        width:1900,
        height:900
    };
    
    public playerStarts:any={};
    
    public userdesign={};
    public Usercharacter = [];
    public generatedEnemies = []
    public classes = {
        all: [
            {
                nr:1,
                id: 'mage',
                class: 'Mage',
                LVL: 1,
                HP: 230,
                MP: 120,

                MAXHP: 230,
                MAXMP: 120,

                ATK: 3,
                DEF: 1,

                MPRESTORE: 5,
                HPRESTORE: 5
            },
            {
                nr:2,
                id: 'warrior',
                class: 'Warrior',
                LVL: 1,
                HP: 400,
                MP: 40,

                MAXHP: 400,
                MAXMP: 40,

                ATK: 2,
                DEF: 3,

                MPRESTORE: 1,
                HPRESTORE: 7
            },
            {
                nr:3,
                id: 'archer',
                class: 'Archer',
                LVL: 1,
                HP: 300,
                MP: 60,

                MAXHP: 300,
                MAXMP: 60,

                ATK: 2,
                DEF: 2,

                MPRESTORE: 2,
                HPRESTORE: 3
            }
        ],

        highest: {
            ATK: 3,
            DEF: 3,
            HP: 300,
            MP: 120,
            REG: 10,

        }
    }
    public starterWeponPack={
        mage:{
            MELEE:[{
                ID:'woodenSword'
            }],
            MAGIC:[{
                ID:'fireball'
            },
            {
                ID:'acidrain'
            },
            {
                ID:'firetornado'
            },
            {
                ID:'icespike'
            },
            {
                ID:'thunder'
            },
            {
                ID:'acidrain'
            },
            {
                ID:'firetornado'
            },
            {
                ID:'icespike'
            },
            {
                ID:'thunder'
            }],
            QUICKBAG:[{
                ID:'largeHPpotion'
            }]
        },
        warrior:{
            MELEE:[{
                ID:'woodenSword'
            }],
            MAGIC:[{
                ID:'fireball'
            }],
            QUICKBAG:[{
                ID:'largeHPpotion'
            }]
        },
        archer:{
            MELEE:[{
                ID:'woodenSword'
            }],
            MAGIC:[{
                ID:'fireball'
            }],
            QUICKBAG:[{
                ID:'largeHPpotion'
            }]
        }
    }
    public LVLEXP = {
        mage: [

            { EXP: 0, LVL: 1, NAME: 'Novice' },
            { EXP: 100, LVL: 2, NAME: 'Novice' },
            { EXP: 400, LVL: 3, NAME: 'Novice' },
            { EXP: 1200, LVL: 4, NAME: 'Novice' },
            { EXP: 4800, LVL: 5, NAME: 'Novice' },
            { EXP: 19200, LVL: 6, NAME: 'Veteran' },
            { EXP: 76800, LVL: 7, NAME: 'Expert' },
            { EXP: 307200, LVL: 8, NAME: 'Master' },
            { EXP: 1228800, LVL: 9, NAME: 'LEGENDARY' },
            { EXP: 4915200, LVL: 10, NAME: 'FORBIDDEN' }

        ],
        warrior: [

            { EXP: 0, LVL: 1, NAME: 'Novice' },
            { EXP: 100, LVL: 2, NAME: 'Novice' },
            { EXP: 400, LVL: 3, NAME: 'Novice' },
            { EXP: 1200, LVL: 4, NAME: 'Novice' },
            { EXP: 4800, LVL: 5, NAME: 'Novice' },
            { EXP: 19200, LVL: 6, NAME: 'Veteran' },
            { EXP: 76800, LVL: 7, NAME: 'Expert' },
            { EXP: 307200, LVL: 8, NAME: 'Master' },
            { EXP: 1228800, LVL: 9, NAME: 'LEGENDARY' },
            { EXP: 4915200, LVL: 10, NAME: 'FORBIDDEN' }

        ],
        archer: [

            { EXP: 0, LVL: 1, NAME: 'Novice' },
            { EXP: 100, LVL: 2, NAME: 'Novice' },
            { EXP: 400, LVL: 3, NAME: 'Novice' },
            { EXP: 1200, LVL: 4, NAME: 'Novice' },
            { EXP: 4800, LVL: 5, NAME: 'Novice' },
            { EXP: 19200, LVL: 6, NAME: 'Veteran' },
            { EXP: 76800, LVL: 7, NAME: 'Expert' },
            { EXP: 307200, LVL: 8, NAME: 'Master' },
            { EXP: 1228800, LVL: 9, NAME: 'LEGENDARY' },
            { EXP: 4915200, LVL: 10, NAME: 'FORBIDDEN' }

        ]

    }
    public Attacks = {
        MELEE: [
            {
                NAME: 'Bite',
                DMG: 6,
                MP: 0,
                DEF: 0,
                HP: 0,
                ID: 'bite',
                DUR: 1,
                type: 'normal'
            },
            {
                NAME: 'Single Wood Sword',
                DMG: 10,
                MP: 0,
                DEF: 0,
                HP: 0,
                ID: 'woodenSword',
                DUR: 1,
                type: 'wood'
            },
            {
                NAME: 'Single Iron Sword',
                DMG: 20,
                MP: 0,
                DEF: 0,
                HP: 0,
                ID: 'ironSword',
                DUR: 1,
                type: 'iron'
            },



        ],
        QUICKBAG: [
            {
                NAME: 'Small Health Potion',
                DMG: 0,
                MP: 0,
                DEF: 0,
                HP: 20,
                ID: 'smallHPpotion',
                type:'potions'
            },
            {
                NAME: 'Medium Health Potion',
                DMG: 0,
                MP: 0,
                DEF: 0,
                HP: 40,
                ID: 'mediumHPpotion',
                type:'potions'
            },
            {
                NAME: 'Large Health Potion',
                DMG: 0,
                MP: 0,
                DEF: 0,
                HP: 90,
                ID: 'largeHPpotion',
                type:'potions'
            },
            {
                NAME: 'Small Manna Potion',
                DMG: 0,
                MP: 30,
                DEF: 0,
                HP: 0,
                ID: 'smallMPpotion',
                type:'potions'
            },
            {
                NAME: 'Medium Manna Potion',
                DMG: 0,
                MP: 40,
                DEF: 0,
                HP: 0,
                ID: 'mediumMPpotion',
                type:'potions'
            },
            {
                NAME: 'Large Manna Potion',
                DMG: 0,
                MP: 90,
                DEF: 0,
                HP: 0,
                ID: 'largeMPpotion',
                type:'potions'
            }
        ],
        MAGIC: [
            {
                NAME: 'FireBall',
                DMG: 50,
                MP: 20,
                DEF: 0,
                ID: 'fireball',
                HP: 0,
                DUR: 1,
                type: 'fire'
            },
            {
                NAME: 'Acid Rain',
                DMG: 10,
                MP: 30,
                DEF: 0,
                ID: 'acidrain',
                HP: 0,
                DUR: 6,
                type: 'water'

            },
            {
                NAME: 'Fire Tornado',
                DMG: 50,
                MP: 90,
                DEF: 0,
                ID: 'firetornado',
                HP: 0,
                DUR: 3,
                type: 'fire'
            },
            {
                NAME: 'Ice Spike',
                DMG: 30,
                MP: 15,
                DEF: 0,
                ID: 'icespike',
                HP: 0,
                DUR: 1,
                type: 'ice'
            },
            {
                NAME: 'Thunder',
                DMG: 20,
                MP: 30,
                DEF: 0,
                ID: 'thunder',
                HP: 0,
                DUR: 3,
                type: 'electricity'
            }
        ]
    }
    public enemyList = {
        spider: [
            {
            IMG:0,
            ID: 'forest',
            NAME: 'Forest Spider',
            CLASS: 'spider',
            HP: 100,
            MP: 30,
            LVL: 1,
            MAXHP: 100,
            MAXMP: 30,
            XPGAIN: 10,
            ATK: 1,
            DEF: 1,

            TAKINGDAMAGE: '',

            ATTACKS: [],
            ATTACKLIST: [
                { ID: "bite", TYPE: "MELEE" },
                { ID: 'smallHPpotion', TYPE: "QUICKBAG" },

            ],
        }
    
    ],
        mage: [{
            IMG:0,
            ID: 'forest',
            NAME: 'Forest Mage',
            CLASS: 'mage',
            LVL: 2,
            HP: 200,
            MP: 100,
            XPGAIN: 30,
            MAXHP: 200,
            MAXMP: 100,

            ATK: 2,
            DEF: 2,

            TAKINGDAMAGE: '',

            ATTACKS: [],
            ATTACKLIST: [
                { ID: "woodenSword", TYPE: "MELEE" },
                { ID: 'smallHPpotion', TYPE: "QUICKBAG" },
                { ID: 'icespike', TYPE: "MAGIC" }
            ],
        },
        {
            IMG:4,
            ID: 'dark',
            NAME: 'Dark Mage',
            CLASS: 'mage',
            LVL: 4,
            HP: 500,
            MP: 200,

            MAXHP: 500,
            MAXMP: 200,
            XPGAIN: 500,
            ATK: 4,
            DEF: 4,

            TAKINGDAMAGE: '',

            ATTACKS: [],
            ATTACKLIST:
                [
                    
                    { ID: 'largeHPpotion', TYPE: "QUICKBAG" },
                    { ID: 'icespike', TYPE: "MAGIC" },
                    { ID: 'fireball', TYPE: "MAGIC" },
                    { ID: 'firetornado', TYPE: "MAGIC" },
                    { ID: 'thunder', TYPE: "MAGIC" },
                    { ID: 'acidrain', TYPE: "MAGIC" }
                ]

        }],
        warrior: [
            {
                IMG:0,
                ID: 'town',
                NAME: 'Town Guard',
                CLASS: 'guard',
                LVL: 2,
                HP: 200,
                MP: 100,
                XPGAIN: 20,
                MAXHP: 200,
                MAXMP: 100,

                ATK: 2,
                DEF: 0,

                TAKINGDAMAGE: '',
                ATTACKLIST: [
                    { ID: "woodenSword", TYPE: "MELEE" },
                    { ID: 'smallHPpotion', TYPE: "QUICKBAG" },
                    { ID: 'icespike', TYPE: "MAGIC" },
                    { ID: 'ironSword', TYPE: "MEELLE" }
                ],
                ATTACKS: []
            }
        ]
    }



    generateEnemies(params) {
        console.log('generating Enemies')
        
        let counter = 0;
        let enemies = []
        let enemyTypes = params.EnemyID;
        let enemyClases = params.Clases;
        console.log(params)
        for (let enemyClass of enemyClases) {
            console.log('1')
            for (let enemyType of enemyTypes) {
                console.log(this.enemyList)
                console.log(enemyClass.ID)
                for (let enemy of this.enemyList[enemyClass.ID]) {
                    console.log('3')
                    if (enemyClass.ID == enemy.CLASS && enemyType.ID == enemy.ID) {
                        console.log('4')
                        let enemie = {
                            IMG: enemy.IMG,
                            CLASS: enemy.CLASS,
                            ID: enemy.ID,
                            NAME: enemy.NAME,
                            LVL: enemy.LVL,
                            HP: enemy.HP,
                            MP: enemy.MP,

                            MAXHP: enemy.MAXHP,
                            MAXMP: enemy.MAXMP,

                            ATK: enemy.ATK,
                            DEF: enemy.DEF,

                            TAKINGDAMAGE: {
                                1:'',
                                2:''
                            },
                            ATTACKS: []
                        }
                        for (let attacktypes of enemy.ATTACKLIST) {
                            //console.log(attacktypes["TYPE"])
                            //console.log(this.Attacks[attacktypes["TYPE"]])

                            for (let attack of this.Attacks[attacktypes["TYPE"]]) {





                                if (attack["ID"] == attacktypes["ID"]) {
                                    //console.log(attack)
                                    let attackToPush = {
                                        
                                        NAME: attack.NAME,
                                        DMG: attack.DMG,
                                        MP: attack.MP,
                                        DEF: attack.DEF,
                                        ID: attack.ID,
                                        HP: attack.HP,
                                        DUR: attack.DUR,
                                        type: attack.type
                                    }
                                    enemie.ATTACKS.push(attackToPush);
                                    //console.log(attackToPush)
                                }

                            }

                        }
                        enemies.push(enemie);
                        counter++;
                        if (counter == 3) {
                            this.generatedEnemies = enemies;
                           // console.log(this.generatedEnemies)
                            return;
                        }
                    }
                }


            }
        }
        this.generatedEnemies = enemies;
       // console.log(this.generatedEnemies)



    }

    generateNewPlayer() {
       // console.log('generating Player Stats')
        
        for(let clasee of this.classes.all){
//console.log(this.Usercharacter[0]['class']+'=='+clasee.nr)
            if(this.Usercharacter[0]['class']==clasee.nr){
                let playerS={   
                TAKINGDAMAGE: {
                    1:'',
                    2:''
                  },
                class: clasee.class,
                LVL: clasee.LVL,
                HP: clasee.HP,
                MP: clasee.MP,
                ID:clasee.id,
            
                MAXHP: clasee.MAXHP,
                MAXMP: clasee.MAXMP,
            
                ATK: clasee.ATK,
                DEF: clasee.DEF,
            
                MPRESTORE:clasee.MPRESTORE,
                HPRESTORE:clasee.HPRESTORE,
                BAG:[],
                ATTACKS: []
              };

              for (let attacktypes of Object.keys(this.Attacks)) {
            //     //console.log(attacktypes["TYPE"])
            //     //console.log(this.Attacks[attacktypes["TYPE"]])
            let SPattacks=[

            ]
            for(let SPattack of this.starterWeponPack[clasee.id][attacktypes]){
                 for (let attack of this.Attacks[attacktypes]) {



                    
                  
                   // console.log(this.starterWeponPack[clasee.id][attacktypes])
                   
                    
                       // console.log(SPattack )
                        if (attack.ID == SPattack.ID) {
                            //  console.log(attack.ID +'='+this.starterWeponPack[clasee.id][attacktypes].ID)
                               console.log(attack.ID)
                              let attackToPush = {
                                   NAME: attack.NAME,
                                   DMG: attack.DMG,
                                   MP: attack.MP,
                                   DEF: attack.DEF,
                                   ID: attack.ID,
                                   HP: attack.HP,
                                   DUR: attack.DUR,
                                   type: attack.type
                               }
                               
      
                               
                               SPattacks.push(JSON.parse(JSON.stringify(attackToPush)))
                             //  console.log(playerS.ATTACKS[0][attacktypes])
                             
                           }
                           else{
                            //  console.log(attack.ID +'!='+this.starterWeponPack[clasee.id][attacktypes].ID)
                           }
                    }

                     
                    
                 }
                 playerS.ATTACKS.push({[attacktypes]:SPattacks})
             }
             
             // playerS.ATTACKS[0].MELEE.push(this.starterWeponPack.mage.MELEE)
              //playerS.ATTACKS[1].MAGIC.push()
              //playerS.ATTACKS[2].QUICKBAG.push()
              
              
              this.playerStarts=playerS;
            }
            
        }
       
        console.log(this.playerStarts)
    }


    getHighestStats() {
        let highest = {
            ATK: 0,
            DEF: 0,
            HP: 0,
            MP: 0,
            REG: 0,
           
        }
        for (let classes of this.classes.all) {
            classes['REG']=classes.MPRESTORE + classes.HPRESTORE;
            for(let stat of Object.keys(highest)){

            
            if (classes[stat]>highest[stat] && stat!='REG'){
                highest[stat]=classes[stat];
            }
            if (classes.MPRESTORE + classes.HPRESTORE > highest.REG && stat=='REG'){
                highest.REG=classes.MPRESTORE + classes.HPRESTORE;
                
            }
        }

        }
       
        this.classes.highest=highest;
       
    }


//loading world map
   async getJSON(path, fileName,worldmap?){
       let fileType='.json'
       if(worldmap){
        fileType=''
       }
        return await new Promise((resolve, reject) => {
          let result =  this.http.get('./assets/json/'+path+'/'+fileName+fileType).subscribe(result => {
            let body = result.json();
            this.userdesign=body;
            return resolve(body)
          });
        });
      
      }
}
