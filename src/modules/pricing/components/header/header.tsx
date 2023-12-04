/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import { Card, Divider } from '@nextui-org/react';

import {
  PieChart,
  Pie,
  Legend,
  ResponsiveContainer,
  Cell,
  Label
} from 'recharts';

function Header() {
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
        fill="#292D32" // Change color if needed to make it visible on the segment
        textAnchor="middle" // Anchor the text in the middle for better alignment
        dominantBaseline="central"
        style={{
          fontSize: '20px' // Adjust font size if needed
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="xl:h-40 col-span-12 xl:col-span-10 col-start-1 xl:col-start-3 bg-white flex-col lg:flex-row items-center   mb-4 p-2 sm:p-3">
      <div className="flex w-full lg:w-[300px] xl:w-auto">
        <div className="p-2 w-full grid grid-cols-12 gap-0 sm:gap-0 lg:gap-0 xl:w-72 ">
          <div className="flex col-span-12 sm:col-span-6 lg:col-span-12 text-base sm:text-xl sm:mr-4 xl:mr-0 items-center justify-between mb-1">
            <span className="font-semibold">Paket:</span>
            <span className=" italic text-sm">Söhbət 1</span>
          </div>

          <div className="flex col-span-12 sm:col-span-6 lg:col-span-12 text-base sm:text-xl justify-between mb-1">
            <span className="font-semibold">Ümumi sayı:</span>
            <span className="italic text-sm">1000</span>
          </div>

          <div className="flex col-span-12 sm:col-span-6 lg:col-span-12 text-base sm:text-xl sm:mr-4 lg:mr-0 justify-between mb-1">
            <span className="font-semibold">İstifadə olunan:</span>
            <span className="italic text-sm">519</span>
          </div>

          <div className="flex col-span-12 sm:col-span-6 lg:col-span-12 text-base sm:text-xl justify-between mb-1">
            <span className="font-semibold">Qalıq:</span>
            <span className="italic text-sm">520</span>
          </div>
        </div>
        <Divider orientation="vertical" className="h-28 ml-2 hidden lg:block" />
      </div>
      {/* <div className="flex h-full w-full px-6 overflow-y-scroll sm:overflow-y-hidden">
        <div className="mb-3">
          <div className="w-full flex justify-between">
            <div className="w-32 md:w-40 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart className="custom-row-chart-wrapper">
                  <Pie
                    data={chartData1}
                    outerRadius={100}
                    innerRadius={50}
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

            <div className="w-32 h-32 ">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart className="custom-row-chart-wrapper">
                  <Pie
                    data={chartData2}
                    outerRadius={100}
                    innerRadius={50}
                    labelLine={false}
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
            <div className="w-32 h-32 ">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart className="custom-row-chart-wrapper">
                  <Pie
                    data={chartData3}
                    labelLine={false}
                    outerRadius={100}
                    innerRadius={50}
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
      </div> */}
      <div className="w-full flex overflow-y-scroll sm:overflow-y-hidden">
        <div className="w-full grid grid-cols-12 jack">
          <div className="w-full sm:w-[14rem] xl:w-[15rem] h-36 col-span-12 sm:col-span-6 md:col-span-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart className="custom-row-chart-wrapper">
                <Pie
                  data={chartData1}
                  outerRadius={100}
                  innerRadius={50}
                  fill="#8884d8"
                  style={{
                    fontSize: '12px !important'
                  }}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  paddingAngle={4}
                  dataKey="value"
                  className="WWWWWWWWWWW"
                >
                  <Label
                    value={chartData1.reduce(
                      (accumulator, currentItem) =>
                        accumulator + currentItem.value,
                      0
                    )}
                    className="text-[20px]"
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
                    fontSize: '9px'
                  }}
                  iconSize={8}
                  layout="horizontal"
                  align="right"
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
          <div className="w-full sm:w-[14rem] xl:w-[15rem] h-36 col-span-12 sm:col-span-6 md:col-span-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart className="custom-row-chart-wrapper">
                <Pie
                  data={chartData2}
                  outerRadius={100}
                  innerRadius={50}
                  fill="#8884d8"
                  style={{
                    fontSize: '12px !important'
                  }}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  paddingAngle={5}
                  dataKey="value"
                  className="WWWWWWWWWWW"
                >
                  <Label
                    value={chartData2.reduce(
                      (accumulator, currentItem) =>
                        accumulator + currentItem.value,
                      0
                    )}
                    className="text-[20px]"
                    style={{
                      fill: '#292D32'
                    }}
                    position="center"
                  />
                  {chartData2.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colorData2[index]} />
                  ))}
                </Pie>
                <Legend
                  wrapperStyle={{
                    fontSize: '9px'
                  }}
                  iconSize={8}
                  layout="horizontal"
                  align="right"
                  payload={chartData2.map((item, index) => ({
                    id: item.name,
                    type: 'square',
                    value: `${item.name} : ${item.value}`,
                    color: colorData2[index % colorData2.length]
                  }))}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full sm:w-[14rem] xl:w-[15rem] h-38 col-span-12 sm:col-span-6 md:col-span-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart className="custom-row-chart-wrapper">
                <Pie
                  data={chartData3}
                  outerRadius={100}
                  innerRadius={50}
                  fill="#8884d8"
                  style={{
                    fontSize: '12px !important'
                  }}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  paddingAngle={5}
                  dataKey="value"
                  className="WWWWWWWWWWW"
                >
                  <Label
                    value={chartData3.reduce(
                      (accumulator, currentItem) =>
                        accumulator + currentItem.value,
                      0
                    )}
                    className="text-[20px]"
                    style={{
                      fill: '#292D32'
                    }}
                    position="center"
                  />
                  {chartData3.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colorData3[index]} />
                  ))}
                </Pie>
                <Legend
                  wrapperStyle={{
                    fontSize: '9px'
                  }}
                  iconSize={8}
                  layout="horizontal"
                  align="right"
                  payload={chartData3.map((item, index) => ({
                    id: item.name,
                    type: 'square',
                    value: `${item.name} : ${item.value}`,
                    color: colorData3[index % colorData3.length]
                  }))}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Header;
