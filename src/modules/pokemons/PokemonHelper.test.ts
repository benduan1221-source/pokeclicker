import PokemonType from '../enums/PokemonType';
import { getNetballCatchBonus } from './PokemonHelper';

describe('getNetballCatchBonus', () => {
    it('adds 15 catch rate for Water-type Pokémon', () => {
        expect(getNetballCatchBonus([PokemonType.Water])).toBe(15);
    });

    it('adds 15 catch rate for Bug-type Pokémon', () => {
        expect(getNetballCatchBonus([PokemonType.Bug])).toBe(15);
    });

    it('adds the bonus only once for Pokémon with both eligible types', () => {
        expect(getNetballCatchBonus([PokemonType.Water, PokemonType.Bug])).toBe(15);
    });

    it('adds the bonus when Water or Bug is the secondary type', () => {
        expect(getNetballCatchBonus([PokemonType.Fire, PokemonType.Water])).toBe(15);
        expect(getNetballCatchBonus([PokemonType.Normal, PokemonType.Bug])).toBe(15);
    });

    it('does not add catch rate for other types', () => {
        const otherTypes = Object.values(PokemonType).filter((type): type is PokemonType => (
            typeof type === 'number' && type !== PokemonType.Water && type !== PokemonType.Bug
        ));
        otherTypes.forEach((type) => {
            expect(getNetballCatchBonus([type])).toBe(0);
        });
    });
});
