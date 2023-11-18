/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
    { name: 'Group A', value: 600 },
    { name: 'Group B', value: 200 }
  ];
  const chartData2 = [
    { name: 'Group A', value: 600 },
    { name: 'Group B', value: 200 }
  ];
  const chartData3 = [
    { name: 'Group A', value: 600 },
    { name: 'Group B', value: 200 }
  ];
  const colorData1 = ['#319CFF', '#B3DAFF'];
  const colorData2 = ['#31FF90', '#B3FFD6'];
  const colorData3 = ['#FF9431', '#FFD7B3'];
  return (
    <Card className="  shadow  h-full ">
      <div className="flex justify-between items-center mb-4 bg-black p-3">
        <h2 className="text-xl text-white font-semibold">
          Mənim <br /> Tarifim
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
      <div className="bg-white rounded-lg shadow py-3 px-6 overflow-y-scroll">
        <div className="mb-4">
          <div className="text-black text-sm font-medium	  mb-2">
            Hərtərəfli XL
          </div>
          <div className="flex">
            <div className="w-32 h-32 ">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData1}
                    outerRadius={60}
                    innerRadius={35}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Label
                      value="any text"
                      className="text-sm"
                      position="center"
                    />
                    {chartData1.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colorData1[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-32 h-32 ">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData2}
                    outerRadius={60}
                    innerRadius={35}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Label
                      value="any text"
                      className="text-sm"
                      position="center"
                    />
                    {chartData2.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colorData2[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-32 h-32 ">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData3}
                    outerRadius={60}
                    innerRadius={35}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Label
                      value="any text"
                      className="text-sm"
                      position="center"
                    />
                    {chartData3.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colorData3[index]} />
                    ))}
                  </Pie>
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
