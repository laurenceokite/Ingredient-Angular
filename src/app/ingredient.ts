import { GlobalSystems, GlobalUnits, Recipe } from "./recipe/recipe";

export interface IIngredientData { 
    name: string;
    weight?: number;
    volume?: number;
}

interface IRecipeData {
    system: GlobalSystems;
    units: GlobalUnits;
}

interface IUnit { divisor: number, abbrev: string }

interface ISystem {
    [key: string]: IUnit | any;
    selectedUnit: keyof ISystem
}

export class Ingredient {
    private _weight = {

        metric: <ISystem> {
            milligrams: { divisor: .001, abbrev: 'mg' },
            grams: { divisor: 1, abbrev: 'g' },
            kilograms: { divisor: 1000, abbrev: 'k' },
            selectedUnit: 'grams'
        },
 

        us: <ISystem> {
            pounds: { divisor: 454, abbrev: 'lbs.' },
            ounces: { divisor: 28, abbrev: 'oz.' },
            selectedUnit: 'ounces'
        }    
    };
  
    private _volume = {

        metric: <ISystem> {
            milliliters: { divisor: 1, abbrev: 'mL' },
            liters: { divisor: 1000, abbrev: 'L' },
            selectedUnit: 'milliliters'
        },
  
        us: <ISystem>  {   
            cups: { divisor: 240, abbrev: 'C' },
            quarts: { divisor: 946, abbrev: 'Q' },
            gallons: { divisor: 3785, abbrev: 'G' },
            teaspoons: { divisor: 4.929, abbrev: 'tsp.' },
            tablespoons: { divisor: 14.787, abbrev: 'tbsp.' },
            fluidOunces: { divisor: 29.575, abbrev: 'fl. oz.' },
            selectedUnit: 'cups'
        }
    };

    private _standard = {
        weight: 0,
        volume: 0
    };

    private _recipe: IRecipeData;
    
    name?: string;

    
    constructor(
        recipe: Recipe, 
        data?: IIngredientData,

        //index can be set on init, for ingredients originating from saved recipe
        public index: number = 0) {

        this._recipe =  {
            units: recipe.units,
            system: recipe.system,
        }

        if (data) {
            this.name = data.name;
            this.weight = data.weight || 0;
            this.volume = data.volume || 0;
        }
    }

    set recipe(recipe: Recipe) {
        this._recipe =  {
            units: recipe.units,
            system: recipe.system,
        }
    }

    get standard() { return this._standard }

    get weightUnits() {
        return this._weight;
    }

    get volUnits() {
        return this._volume;
    }

    get weight() { 
        const { system } = this._recipe;
        const { selectedUnit } = this._weight[system];
        const { divisor } = this._weight[system][selectedUnit]

        return this._standard.weight / divisor; 
    }

    set weight(value: number) {
        const { system } = this._recipe;
        const { selectedUnit } = this._weight[system];

        this._standard.weight = this._weight[system][selectedUnit].divisor * value;
    }

    get volume() { 
        const { system } = this._recipe;
        const { selectedUnit } = this._volume[system];
        const { divisor } = this._volume[system][selectedUnit];

        return this._standard.volume / divisor;
    }

    set volume(value: number) {
        const { system } = this._recipe;
        const { selectedUnit } = this._volume[system];

        this._standard.volume = this._volume[system][selectedUnit].divisor * value;
    }

    set selectedUnit(unit: keyof ISystem) {
        const { units, system } = this._recipe;

        if (units === 'volume') this._volume[system].selectedUnit = unit;
        if (units === 'weight') this._weight[system].selectedUnit = unit;
    }
};
