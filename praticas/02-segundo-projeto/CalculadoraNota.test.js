let calculadoera = require('./CalculadoraNota');
let { describe, test, expect } = require('@jest/globals');

describe('Calculadora de Notas', () => {
  test('calcularNotaA1 deve retornar a soma correta das notas', () => {
    expect(calculadoera.calcularNotaA1(8, 7, 9)).toBe(24);
    expect(calculadoera.calcularNotaA1(10, 10, 10)).toBe(30);
    expect(calculadoera.calcularNotaA1(0, 0, 0)).toBe(0);
  });

  test('calcularNotaA2 deve retornar a soma correta das notas', () => {
    expect(calculadoera.calcularNotaA2(6, 5, 7)).toBe(18);
    expect(calculadoera.calcularNotaA2(10, 10, 10)).toBe(30);
    expect(calculadoera.calcularNotaA2(0, 0, 0)).toBe(0);
  });

  test('calcularNotaFinal deve retornar a nota final correta', () => {
    expect(calculadoera.calcularNotaFinal(24, 18)).toBeCloseTo(20.4);
    expect(calculadoera.calcularNotaFinal(30, 30)).toBeCloseTo(30);
    expect(calculadoera.calcularNotaFinal(0, 0)).toBeCloseTo(0);
  });
});