'use client'

import { useState, useEffect } from 'react';

interface Holding {
  position: string;
  weight: string;
  marketValue: string;
  currency: string;
  change: string;
}

const defaultHoldings: Holding[] = [
  {
    position: "Genmab AS ADR",
    weight: "5,24",
    marketValue: "€ 148.250",
    currency: "USD",
    change: "+2,45"
  },
  {
    position: "CF Industries Holdings Inc",
    weight: "4,87",
    marketValue: "€ 137.890",
    currency: "USD",
    change: "-1,23"
  },
  {
    position: "StoneCo Ltd Class A",
    weight: "4,65",
    marketValue: "€ 131.670",
    currency: "USD",
    change: "+3,78"
  },
  {
    position: "Airbnb Inc",
    weight: "4,52",
    marketValue: "€ 127.990",
    currency: "USD",
    change: "+1,56"
  },
  {
    position: "Crocs Inc",
    weight: "4,38",
    marketValue: "€ 124.020",
    currency: "USD",
    change: "-0,89"
  }
];

interface TopHoldingsProps {
  holdings?: Holding[];
}

export function TopHoldings({ holdings = defaultHoldings }: TopHoldingsProps) {
  return (
    <div className="mb-8">
      <div className="inline-block bg-gray-100 px-4 py-2 mb-4 rounded-md">
        <h3 className="text-sm font-bold" style={{ color: 'var(--svi-primary)' }}>
          Posiciones Principales
        </h3>
      </div>

      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-6 py-3 text-left text-sm font-semibold">Posición</th>
              <th className="px-6 py-3 text-right text-sm font-semibold">Peso %</th>
              <th className="px-6 py-3 text-right text-sm font-semibold">Valor de mercado</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Divisa</th>
              <th className="px-6 py-3 text-right text-sm font-semibold">Cambio %</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-6 py-4 text-sm text-gray-900">{holding.position}</td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">{holding.weight}</td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">{holding.marketValue}</td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">{holding.currency}</td>
                <td className={`px-6 py-4 text-sm text-right font-semibold ${
                  holding.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {holding.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
