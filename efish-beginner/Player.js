class Player {
  constructor() {
    this.prevHP;
    this.maxHP = -1;
    //this.enemyCnt = 2;
    this.rescCnt = 3;
    this.left = false;
  }

  playTurn(warrior) {
    const space = warrior.feel(),
          spaceBack = warrior.feel('backward'),
          empty = space.isEmpty(),
          emptyBack = spaceBack.isEmpty(),
          enemy = space.isEnemy(),
          wall = space.isWall(),
          //wallBack = spaceBack.isWall(),
          currHP = warrior.health(),
          numOfEnemiesToShootAhead = warrior.look().reduce((cnt, sp)=> {
            if (sp.isEnemy()) return cnt + 1;
            else return cnt;
          }, 0);

    this.maxHP = Math.max(this.maxHP, currHP);

    if (wall) warrior.pivot();
    else if (space.isCaptive()) {
      warrior.rescue();
      this.rescCnt -= 1;
    }
    else if (/*kill the archer in the beggining*/)



    else if (this.rescCnt > 0) {
      warrior.walk();
    }
    else if (currHP < 8 && currHP < prevHP && numOfEnemiesToShootAhead > 1) {
      warrior.walk('backward');
    }
    else if (enemy) {
      warrior.attack();
    }
    else if (currHP < this.maxHP && numOfEnemiesToShootAhead > 0) {
      warrior.rest();
    }
    else if (numOfEnemiesToShootAhead > 0) {
      warrior.shoot();
    }
    else {
      warrior.walk();
    }

    this.prevHP = currHP;
  }
}
