'use client';

import { Card } from '@/components/ui/card';

interface MetricCardProps {
  value: string;
  label: string;
  description: string;
}

function MetricCard({ value, label, description }: MetricCardProps) {
  return (
    <Card className="p-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-3">
        <div className="inline-flex">
          <span className="inline-block px-4 py-2 rounded-full text-white font-bold text-lg"
                style={{ backgroundColor: 'var(--svi-primary)' }}>
            {value}
          </span>
        </div>
        <h4 className="text-lg font-semibold text-gray-900">{label}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </Card>
  );
}

export function MetricsCards() {
  const metricsColumn1 = [
    {
      value: "86,20%",
      label: "RAC Price",
      description: "Mide la ineficiencia de un precio a corto plazo. Un índice alto suele indicar decisiones de inversión con éxito. >75% es aceptable."
    },
    {
      value: "12,87",
      label: "EV/FCF",
      description: "Mide el valor de mercado de una empresa en relación con su flujo de caja libre. Un valor bajo respecto a su capacidad de generar caja puede ser atractivo."
    },
    {
      value: "15,28",
      label: "PER",
      description: "Mide cuánto pagan los inversores por cada dólar de ganancias de una empresa. Un PER bajo puede sugerir que la empresa está infravalorada."
    },
    {
      value: "16,32%",
      label: "Volatilidad",
      description: "La volatilidad de una cartera de inversión mide la variación o fluctuación de sus rendimientos a lo largo del tiempo."
    },
    {
      value: "0,46",
      label: "Ratio de Sharpe",
      description: "Un ratio de Sharpe mayor indica que la cartera ha obtenido un rendimiento más atractivo en comparación con el nivel de riesgo asumido."
    },
    {
      value: "0,65",
      label: "Ratio de Sortino",
      description: "Mide el rendimiento ajustado al riesgo negativo. Un valor más alto indica menos volatilidad negativa en comparación con el retorno generado."
    },
    {
      value: "9,56%",
      label: "CAGR",
      description: "Es la tasa de crecimiento promedio anual. Un CAGR del 10% indica un crecimiento constante por encima del promedio del S&P 500."
    }
  ];

  const metricsColumn2 = [
    {
      value: "10,93%",
      label: "MOAT SP500",
      description: "Mide las ventajas competitivas de una cartera frente al SP500. Valores superiores al 0% son considerados aceptables para la cartera."
    },
    {
      value: "9,85",
      label: "EV/EBITDA",
      description: "Mide el valor de una empresa respecto a sus ganancias antes de intereses, impuestos, depreciación y amortización. Un valor bajo puede sugerir que la empresa está infravalorada."
    },
    {
      value: "18,55%",
      label: "ROIC",
      description: "Muestra la eficiencia de una empresa en generar beneficios con la inversión. Un ROIC alto indica buena gestión y retorno."
    },
    {
      value: "0,84",
      label: "Beta",
      description: "Mide la sensibilidad de una cartera a los movimientos del mercado. Una Beta mayor a 1 indica mayor movimiento, mientras que menor a 1 implica movimientos más suaves."
    },
    {
      value: "0,09",
      label: "Ratio de Treynor",
      description: "Mide el rendimiento ajustado al riesgo sistemático. Un valor más alto indica un mejor rendimiento en relación con el riesgo del mercado."
    },
    {
      value: "4,30%",
      label: "Tracking Error",
      description: "El tracking error mide la diferencia en rendimiento entre una cartera y su índice de referencia."
    },
    {
      value: "0,61",
      label: "R-Square",
      description: "Mide la relación entre el rendimiento de una cartera y su índice de referencia. Un valor de 1 implica una correlación completa, mientras que un valor cercano a 0 indica independencia."
    }
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--svi-primary)' }}>
        Métricas Clave
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {metricsColumn1.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <div className="space-y-6">
          {metricsColumn2.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
      </div>
    </div>
  );
}
