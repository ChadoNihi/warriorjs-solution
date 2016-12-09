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
          spacesAhead = warrior.look(),
          spacesBack = warrior.look('backward'),
          enemy = space.isEnemy(),
          wall = this._isOnlyWallAhead(spacesAhead),
          //wallBack = spaceBack.isWall(),
          currHP = warrior.health(),
          numOfEnemiesToShootAhead = spacesAhead.reduce((cnt, sp)=> {
              if (sp.isEnemy()) return cnt + 1;
              else return cnt;
            }, 0),
          archerAlive = spacesBack[2].isEnemy();

    this.maxHP = Math.max(this.maxHP, currHP);

    if (wall) warrior.pivot();
    else if (space.isCaptive()) {
      warrior.rescue();
      this.rescCnt -= 1;
    }
    else if (archerAlive) {
      warrior.shoot('backward');
    }
    else if (numOfEnemiesToShootAhead>0) {
      warrior.shoot();
    }
    else {
      warrior.walk();
    }

    this.prevHP = currHP;
  }

  _isOnlyWallAhead(spaces) {
    for (var i = 0; i < spaces.length; ++i) {
      let space = spaces[i];

      if (space.isWall()) return true;
      else if (space.isEmpty() && !space.isStairs()) continue;
      else break;
    }

    return false;
  }
}
