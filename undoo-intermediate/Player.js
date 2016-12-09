class Player {
  constructor() {
    this.prevHP;
    this.maxHP = -1;
    this.enemyCnt = 3;
    this.rescCnt = 3;
  }
  playTurn(warrior) {
    const currHP = warrior.health(),
          dirOfStairs = warrior.directionOfStairs(),
          dirOfCloseEnemy =
            (warrior.feel(dirOfStairs).isEnemy() ? dirOfStairs : this._getDirOfCloseEnemy());

    this.maxHP = Math.max(this.maxHP, currHP);

    if (currHP < 7 && ) {

    }
    else if (dirOfCloseEnemy) {
      warrior.attack(dirOfCloseEnemy);
    }
    else {
      warrior.walk(dirOfStairs);
    }

    this.prevHP = currHP;
  }
}
