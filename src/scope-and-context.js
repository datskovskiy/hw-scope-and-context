class Fighter {
  #name
  #damage
  #hp
  #strength
  #agility 
  #wins
  #loses

  constructor(obj) {
    this.#name = obj.name;
    this.#damage = obj.damage;
    this.#hp = obj.hp;
    this.#strength = obj.strength;
    this.#agility = obj.agility;
    this.#wins = 0;
    this.#loses = 0;
  }

  getWins() {
    return this.#wins;
  }

  setWins(value) {
    if (value < 0) throw new Error("Incorrect value of wins");
    this.#wins = value;
  }

  getLoses() {
    return this.#loses;
  }

  setLoses(value) {
    if (value < 0) throw new Error("Incorrect value of loses");
    this.#loses = value;
  }

  getName() {
    return this.#name;
  }

  getDamage() {
    return this.#damage;
  }

  getStrength() {
    return this.#strength;
  }

  getAgility() {
    return this.#agility;
  }

  getHealth() {
    return this.#hp;
  }

  setHealth(value) {
    if (value < 0) throw new Error("Incorrect value of HP");
    this.#hp = value;
  }

  random() {
    return Math.random() * 100;
  }

  attack(defender) {
    const isSuccessful = defender.getStrength() + defender.getAgility() > this.random();

    if (isSuccessful) {    
      defender.setHealth(defender.getHealth() - this.getDamage());
      console.log(`${this.getName()} makes ${this.getDamage()} damage to ${defender.getName()}`);
    } else {
      console.log(`${this.getName()} attack missed`);
    }     
  }

  logCombatHistory() {
    console.log(`Name:${this.getName()},Wins:${this.getWins()},Losses:${this.getLoses()}`);
  }

  heal(value) {
    this.setHealth(this.getHealth() + value);
  }

  dealDamage(value) {
    let reduce = this.getHealth() - value;
    this.setHealth(reduce < 0 ? 0 : reduce);
  }

  addWin() {
    this.setWins(this.getWins() + 1);
  }

  addLoss() {
    this.setLoses(this.getLoses() + 1);
  }

  isDead() {
    return this.getHealth() === 0;
  }
}

const battle = function (fighter1, fighter2) {
  if (fighter2.isDead()) {
    console.log(`${fighter2.getName()} is dead`);
    return 0;
  }

  if (fighter1.isDead()) {
    console.log(`${fighter1.getName()} is dead`);
    return 0;
  }

  while (!fighter2.isDead() && !fighter1.isDead()) {
    fighter2.attack(fighter1);

    if (fighter1.isDead()) {
      fighter2.addWin();
      fighter1.addLoss();

      console.log(`${fighter2.getName()} has won`);
      return fighter1;
    }

    if (fighter2.isDead()) {
      fighter1.addWin();
      fighter2.addLoss();

      console.log(`${fighter1.getName()} has won`);
      return fighter2;
    }
  }

  return 0;
};

module.exports = { Fighter, battle };
