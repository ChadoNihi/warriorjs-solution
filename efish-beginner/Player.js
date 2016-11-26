class Player {
  constructor() {
    this.prevHP;
    this.maxHP = -1;
    this.enemyCnt = 3;
    this.enemyWasAhead = false;
  }

  playTurn(warrior) {
    const empty = warrior.feel().isEmpty(),
          currHP = warrior.health();

    this.maxHP = Math.max(this.maxHP, currHP);

    if (warrior.feel().isCaptive()) {
      warrior.rescue();
    }
    else if (empty) {
      if (this.enemyWasAhead) {
        this.enemyCnt -= 1;
        this.enemyWasAhead = false;
      }

      if (currHP < this.maxHP && currHP >= this.prevHP && this.enemyCnt > 0) {
        warrior.rest();
      } else {
        warrior.walk();
      }
    }
    else {
      warrior.attack();
      this.enemyWasAhead = true;
    }

    this.prevHP = currHP;
  }
}
