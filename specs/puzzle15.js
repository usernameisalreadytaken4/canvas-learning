function init() {
  var canvas = document.getElementById('puzzle15');
  canvas.width = 320;
  canvas.height = 320;
  var cellSize = canvas.width / 4;
  var context = canvas.getContext('2d');
  var field = new game15();
  field.mix(350);
  field.setCellView(function(x, y) {
    context.fillStyle = "#FFB93B";
    context.fillRect(x+1, y+1, cellSize-2, cellSize-2);
  });
  field.setNumView(function() {
    context.font = 'bold ' + (cellSize/2) + 'px Sans';
    context.textAlign = 'center';
    context.textBaseLine = 'middle';
    context.fillStyle = '#222';
  });
  context.fillStyle = '#222';
  context.fillRect(0, 0, canvas.width, canvas.height);
  field.draw(context, cellSize);
  function event (x, y) {
    field.move(x, y);
    context.fillStyle = '#222';
    context.fillRect(0, 0, canvas.width, canvas.height);
    field.draw(context, cellSize);
    if (field.victory()) {
      alert('Собрано за ' + field.getClicks()+' касание!');
      field.mix(300);
      context.fillStyle = '#222';
      context.fillRect(0, 0, canvas.width, canvas.height);
      field.draw(context, cellSize);
    }
  }
  canvas.onclick = function(e) {
    var x = (e.pageX - canvas.offsetLeft) / cellSize | 0;
    var y = (e.pageY - canvas.offsetTop) / cellSize | 0;
    event(x, y);
  };
}

function game15() {
  var cellView = null;
  var numView = null;
  var arr = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];
  var clicks = 0;
  function getNull() {
    for (var i=0; i<4; i++) {
      for (var j=0; j<4; j++) {
        if (arr[j][i] === 0) {
          return {'x': i, 'y': j};
        }
      }
    }
  };

    function getRandomBool() {
      if (Math.floor(Math.random() * 2) === 0) {
        return true;
      }
    };

    this.getClicks = function() {
        return clicks;
      };

    this.move = function(x, y) {
        var nullX = getNull().x;
        var nullY = getNull().y;
        if (((x - 1 == nullX || x + 1 == nullX) && y == nullY) || ((y - 1 == nullY || y + 1 == nullY) && x == nullX)) {
          arr[nullY][nullX] = arr[y][x];
          arr[y][x] = 0;
          clicks++;
        }
      };


      this.victory = function() {
        var e = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];
        var res = true;
        for (var i =0; i<4; i++) {
          for (var j=0; j<4; j++) {
            if (e[i][j] != arr[i][j]) {
              res = false;
            }
          }
        }
          return res;
      };
    this.mix = function(stepCount) {
		var x,y;
		for (var i = 0; i < stepCount; i++) {
			var nullX = getNull().x;
			var nullY = getNull().y;
			var hMove = getRandomBool();
			var upLeft = getRandomBool();
			if (!hMove && !upLeft) { y = nullY; x = nullX - 1;}
			if (hMove && !upLeft)  { x = nullX; y = nullY + 1;}
			if (!hMove && upLeft)  { y = nullY; x = nullX + 1;}
			if (hMove && upLeft)   { x = nullX; y = nullY - 1;}
			if (0 <= x && x <= 3 && 0 <= y && y <= 3) {
				this.move(x, y);
			}
		}
		clicks = 0;
	};

      this.setCellView = function(func) {
        cellView = func;
      };
      this.setNumView = function(func){
        numView = func;
      };

      this.draw = function(context, size) {
        for (var i =0; i<4; i++) {
          for (var j=0;j<4; j++) {
            if (arr[i][j] > 0) {
              if (cellView !== null) {
                cellView(j*size, i*size);
              }
              if (numView !== null) {
                numView();
                context.fillText(arr[i][j], j * size + size /2, i * size + size / 2);
              }
            }
          }
        }
      };
    }
