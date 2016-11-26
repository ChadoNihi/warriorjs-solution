class Player {
  constructor() {
    this.prevHP;
    this.maxHP = -1;
    this.enemyCnt = 3;
    this.resqCnt = 1;
  }

  playTurn(warrior) {
    const empty = warrior.feel().isEmpty(),
          emptyBack = warrior.feel('backward').isEmpty(),
          currHP = warrior.health();

    this.maxHP = Math.max(this.maxHP, currHP);

    if (this.resqCnt > 0 && emptyBack) {
      warrior.walk('backward');
    }
    else if (warrior.feel('backward').isCaptive()) {
      warrior.rescue('backward');
      this.resqCnt -= 1;
    }
    else if (this.enemyCnt === 1 && currHP > 15) {
      if (empty) {
        warrior.walk();
      } else {
        warrior.attack();
      }
    }
    else if (currHP < 8 && currHP < this.prevHP && emptyBack) {
      warrior.walk('backward');
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
