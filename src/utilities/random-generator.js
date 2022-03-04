export class RandomGenerator {
    static randInt(max) {
        return Math.random * max;
    }

    static randIntBetween(low, high) {
        let difference = Math.abs(high - low);
        return low + this.randInt(difference);
    }

    // generate vectors instead?
}