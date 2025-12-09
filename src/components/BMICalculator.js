import React, { useState } from 'react';

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    if (!height || !weight) {
      alert('Please enter both height and weight');
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);

    if (heightInMeters <= 0 || weightInKg <= 0) {
      alert('Please enter valid positive numbers');
      return;
    }

    // BMI Formula: weight (kg) / height (m)²
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    const roundedBMI = Number(bmiValue.toFixed(1));

    setBmi(roundedBMI);

    // Determine category
    let bmiCategory = '';

    if (bmiValue < 18.5) {
      bmiCategory = 'Underweight';
    } else if (bmiValue < 25) {
      bmiCategory = 'Normal weight';
    } else if (bmiValue < 30) {
      bmiCategory = 'Overweight';
    } else {
      bmiCategory = 'Obese';
    }

    setCategory(bmiCategory);
  };

  const resetCalculator = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">BMI Calculator</h2>
        <p className="text-gray-400">Calculate your Body Mass Index</p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g., 175"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g., 70"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={calculateBMI}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Calculate BMI
          </button>
          <button
            onClick={resetCalculator}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all"
          >
            Reset
          </button>
        </div>

        {bmi !== null && (
          <div className="mt-8 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700">
            <div className="text-center mb-4">
              <p className="text-gray-400 text-sm mb-2">Your BMI</p>
              <p className="text-5xl font-bold text-white mb-2">{bmi}</p>
              <p className={`text-xl font-semibold ${category === 'Normal weight' ? 'text-green-400' : category === 'Underweight' ? 'text-blue-400' : category === 'Overweight' ? 'text-yellow-400' : 'text-red-400'}`}>
                {category}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-xs text-gray-500 mb-2">BMI Formula:</p>
              <p className="text-sm text-gray-400 font-mono bg-gray-900 p-3 rounded border border-gray-800">BMI = weight (kg) ÷ height (m)²</p>
              <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>• Underweight: BMI &lt; 18.5</p>
                <p>• Normal weight: BMI 18.5 - 24.9</p>
                <p>• Overweight: BMI 25 - 29.9</p>
                <p>• Obese: BMI ≥ 30</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


