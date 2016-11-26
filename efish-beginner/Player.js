class Player {
  constructor() {
    this.prevHP;
    this.maxHP = -1;
    this.enemyCnt = 2;
    this.resqCnt = 1;
    this.left = false;
  }

  playTurn(warrior) {
    const empty = warrior.feel().isEmpty(),
          emptyBack = warrior.feel('backward').isEmpty(),
          wall = warrior.feel().isWall(),
          //wallBack = warrior.feel('backward').isWall(),
          currHP = warrior.health();

    this.maxHP = Math.max(this.maxHP, currHP);

    if (wall) {
      warrior.pivot();
      this.left = !this.left;
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
