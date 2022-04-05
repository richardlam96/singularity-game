export class RandomGenerator {
    static randInt(max) {
        return Math.random() * max;
    }

    static randIntBetween(low, high) {
        let difference = high - low;
        return low + this.randInt(difference);
    }

    static randTrueFalse() {
        return Math.random() < 0.5;
    }

    // generate vectors instead?
}