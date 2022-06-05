import { Ingredient } from '../ingredient'

export type GlobalSystems = 'metric' | 'us';
export type GlobalUnits = 'weight' | 'volume';
export type IngredientInput = { name: string, value: number }

export class Recipe {
    private _multiplier = 1;
    private _data = new Ingredient(this);

    constructor(
        private _system: GlobalSystems = 'metric', 
        private _units: GlobalUnits = 'weight',
        private _ingredients: Ingredient[] = [],
        public anchorIndex: number = 0,
        public recipeYield: number = 1,
        public name?: string 
    ) {
        if (_ingredients.length) {
            //sort loaded ingredients by order in which they were saved
            this._ingredients = this._ingredients.sort((a,b) => a.index - b.index);
        }
    }

    get data() {
        return this._data
    }

    get system() { return this._system }

    set system(system: GlobalSystems) {
        this._system = system;
        
        //sync ingredient._recipe
        this._ingredients.forEach(ingredient => ingredient.recipe = this);
    }

    get units() { return this._units }

    set units(units: GlobalUnits) {
        this._units = units;

        //sync ingredient._recipe
        this._ingredients.forEach(ingredient => ingredient.recipe = this);
    }

    set multiplier(multiplier: number) { 
        const factor = multiplier / this._multiplier;

        this._multiplier = multiplier;
        this.recipeYield *= factor;

        for (const ingredient of this._ingredients) {
            //get ingredient._weight & _volume
            const { weight, volume } = ingredient;

            //set ingredient._weight & _volume
            ingredient.weight = weight * factor;
            ingredient.volume = volume * factor;
        } 
    }

    get ingredients() {
        return this._ingredients;
    }

    addIngredient({name, value = 0}: IngredientInput) {
        if (name == ('' || undefined)) throw Error('ingredient must have a name');

        const data = {
            name: name,
            [this._units]: value
        }

        const newIngredient = new Ingredient(this, data);

        //sync ingredient index w/ recipe
        newIngredient.index = this._ingredients.length;

        this._ingredients.push(newIngredient);
    }

    moveIngredient(fromIndex: number, toIndex: number) {
        const max = this._ingredients.length - 1;
        if (toIndex < 0 || toIndex > max) throw Error('invalid toIndex specified')
        
        const ingredient = this._ingredients[fromIndex];
        
        this._ingredients.splice(fromIndex, 1);
        this._ingredients.splice(toIndex, 0, ingredient);

        //sync ingredient index w/ recipe
        this._ingredients.forEach((ingredient, i) => ingredient.index = i);
    }

    removeIngredient(index: number) {
        if (!this._ingredients[index]) throw Error(`No ingredient at index ${index}`);

        this._ingredients.splice(index, 1);

        //sync ingredient index w/ recipe
        this._ingredients.forEach((ingredient, i) => ingredient.index = i);
    }

    getBakersPercent(index: number): number {
        const anchorVal = this._ingredients[this.anchorIndex].standard[this._units];
        const specifiedVal = this._ingredients[index].standard[this._units];

        return specifiedVal / anchorVal * 100;
    }

    setBakersPercent(index: number, percent: number) {
        const anchorVal = this._ingredients[this.anchorIndex].standard[this._units];
        const factor = percent / 100;

        this._ingredients[index][this._units] = anchorVal * factor;
    }
}
