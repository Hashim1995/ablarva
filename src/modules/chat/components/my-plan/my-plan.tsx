/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { dictionary } from '@/utils/constants/dictionary';
import { Button, Card } from '@nextui-org/react';
import React from 'react';
import { RiPriceTag2Fill } from 'react-icons/ri';

import {
  PieChart,
  Pie,
  Legend,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Label
} from 'recharts';

function MyPlan() {
  const chartData1 = [
    { name: 'Geri qalan', value: 600 },
    { name: 'İstifadə olunan', value: 200 }
  ];
  const chartData2 = [
    { name: 'Geri qalan', value: 600 },
    { name: 'İstifadə olunan', value: 200 }
  ];
  const chartData3 = [
    { name: 'Geri qalan', value: 500 },
    { name: 'İstifadə olunan', value: 500 }
  ];
  const colorData1 = ['#319CFF', '#B3DAFF'];
  const colorData2 = ['#31FF90', '#B3FFD6'];
  const colorData3 = ['#FF9431', '#FFD7B3'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }: any) => {
    // Calculate the radius of the label position to be inside the chart segment
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#292D32"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '11px' // Adjust font size if needed
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="  shadow  h-full ">
      <div className="flex justify-between items-center mb-4 bg-black p-3">
        <h2 className="text-base sm:text-xl text-white font-semibold">
          {dictionary.az.my} {dictionary.az.tariff}
        </h2>
        <Button
          size="sm"
          isIconOnly
          className="bg-white rounded-full"
          aria-label="Filter"
        >
          <RiPriceTag2Fill size={20} color="#292D32" />
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow h-full px-6 overflow-y-scroll">
        <div className="mb-3">
          <div className="text-black text-sm font-medium">Hərtərəfli XL</div>
          <div className=" justify-center grid grid-cols-12 chartsHeight">
            <div className="sm:w-[14rem] md:w-32 col-span-12 h-36 sm:col-span-6 md:col-span-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart className="mobile-row-chart">
                  <Pie
                    data={chartData1}
                    outerRadius={50}
                    innerRadius={28}
                    fill="#8884d8"
                    style={{
                      fontSize: '12px !important'
                    }}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Label
                      value={chartData1.reduce(
                        (accumulator, currentItem) =>
                          accumulator + currentItem.value,
                        0
                      )}
                      className="text-sm"
                      style={{
                        fill: '#292D32'
                      }}
                      position="center"
                    />
                    {chartData1.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colorData1[index]} />
                    ))}
                  </Pie>
                  <Legend
                    wrapperStyle={{
                      fontSize: '9px',
                      bottom: '0'
                    }}
                    iconSize={8}
                    verticalAlign="bottom"
                    height={1}
                    payload={chartData1.map((item, index) => ({
                      id: item.name,
                      type: 'square',
                      value: `${item.name} : ${item.value}`,
                      color: colorData1[index % colorData1.length]
                    }))}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="sm:w-[14rem] md:w-32 col-span-12 h-36 sm:col-span-6 md:col-span-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart className="mobile-row-chart">
                  <Pie
                    data={chartData2}
                    outerRadius={50}
                    labelLine={false}
                    innerRadius={28}
                    style={{
                      fontSize: '12px !important'
                    }}
                    label={renderCustomizedLabel}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Label
                      style={{
                        fill: '#292D32'
                      }}
                      value="123"
                      className="text-sm"
                      position="center"
                    />
                    {chartData2.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colorData2[index]} />
                    ))}
                  </Pie>
                  <Legend
                    wrapperStyle={{
                      fontSize: '9px',
                      bottom: '0'
                    }}
                    iconSize={8}
                    verticalAlign="bottom"
                    height={1}
                    payload={chartData1.map((item, index) => ({
                      id: item.name,
                      type: 'square',
                      value: `${item.name} : ${item.value}`,
                      color: colorData1[index % colorData1.length]
                    }))}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="sm:w-[14rem] md:w-32 col-span-12 h-36 sm:col-span-6 md:col-span-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart className="mobile-row-chart">
                  <Pie
                    data={chartData3}
                    labelLine={false}
                    outerRadius={50}
                    innerRadius={28}
                    label={renderCustomizedLabel}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Label
                      style={{
                        fill: '#292D32'
                      }}
                      value="4312"
                      className="text-sm"
                      position="center"
                    />
                    {chartData3.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colorData3[index]} />
                    ))}
                  </Pie>
                  <Legend
                    wrapperStyle={{
                      fontSize: '9px',
                      bottom: '0'
                    }}
                    iconSize={8}
                    verticalAlign="bottom"
                    height={1}
                    payload={chartData1.map((item, index) => ({
                      id: item.name,
                      type: 'square',
                      value: `${item.name} : ${item.value}`,
                      color: colorData1[index % colorData1.length]
                    }))}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default MyPlan;
