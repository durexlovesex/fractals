/**
 * Т-квадрат
 *
 * @class
 * @implements {BaseFractal}
 */
class TSquare extends BaseFractal {
	constructor(x, y, scl) {
		super(x, y, scl)

		this.limit = 6
	}

	doFirstStep() {
		this.step = 1

		let halfOfScl = floor(this.scl / 6)
		let a = createVector(-halfOfScl, this.y - halfOfScl)
		let c = createVector(halfOfScl, this.y + halfOfScl)

		this.halfOfScl = halfOfScl
		this.squares = [new TElement(a, c)]
	}

	makeAStep(reversed) {
		if (!this.step) {
			this.doFirstStep()
			return true
		}
		if (this.step > this.limit) 
			return false
		reversed = reversed || false
		this.step++
		let next = []
		for (let i = 0; i < this.squares.length; i++) {
			let square = this.squares[i]
			square.step = i
			next.push(square)

			let a
			let c

			a = new p5.Vector(square.A.x - square.offset, square.A.y - square.offset)
			c = new p5.Vector(square.A.x + square.offset, square.A.y + square.offset)
			next.push(new TElement(a, c))

			a = new p5.Vector(square.B.x - square.offset, square.B.y - square.offset)
			c = new p5.Vector(square.B.x + square.offset, square.B.y + square.offset)
			next.push(new TElement(a, c))

			a = new p5.Vector(square.C.x - square.offset, square.C.y - square.offset)
			c = new p5.Vector(square.C.x + square.offset, square.C.y + square.offset)
			next.push(new TElement(a, c))

			a = new p5.Vector(square.D.x - square.offset, square.D.y - square.offset)
			c = new p5.Vector(square.D.x + square.offset, square.D.y + square.offset)
			next.push(new TElement(a, c))
		}
		this.squares = next
		return true
	}

	draw() {
    console.log('drawing TSquare')
    noStroke()
		fill(0)
		let xOffset = this.x / 1.5
		for (let i = 0; i < this.squares.length; i++) {
			let square = this.squares[i]
			beginShape()
			vertex(xOffset + square.A.x, square.A.y)
			vertex(xOffset + square.B.x, square.B.y)
			vertex(xOffset + square.C.x, square.C.y)
			vertex(xOffset + square.D.x, square.D.y)
			vertex(xOffset + square.A.x, square.A.y)
			endShape(CLOSE)
		}
	}
}

class TElement {
	/**
	 * @constructor
	 * @param  {p5.Vector}  start  - Точка начала
	 * @param  {p5.Vector}  end    - Точка конца
	 */
	constructor(start, end) {
		this.start = start
		this.end = end

		this.offset = p5.Vector.sub(this.B, this.A).div(4).x
	}
	get A() {
		return this.start
	}
	get B() {
		return new p5.Vector(this.end.x, this.start.y)
	}
	get C() {
		return this.end
	}
	get reversedC() {
		return this.end
	}
	get D() {
		return new p5.Vector(this.start.x, this.end.y)
	}
}
