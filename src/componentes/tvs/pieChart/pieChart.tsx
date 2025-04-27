import { useMemo } from 'react'
import './pieChart.css'
import * as d3 from "d3"

type PieChartProps = {
    width: number;
    height: number;
    data: DataItem[];
};

type DataItem = {
    name: string;
    value: number;
};

type DataItemList = {
    name: string;
    color: string;
};

const colors = [
    "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#f94144", "#577590", "#f9c74f",
];

const PieChart = ({ width, height, data }: PieChartProps) => {

    const radius = Math.min(width, height) / 2;

    const pie = useMemo(() => {
        const pieGenerator = d3.pie<any, DataItem>().value((d) => d.value);
        return pieGenerator(data);
    }, [data]);

    const arcs = useMemo(() => {
        const arcPathGenerator = d3.arc();
        return pie.map((p) =>
            arcPathGenerator({
                innerRadius: 0,
                outerRadius: radius,
                startAngle: p.startAngle,
                endAngle: p.endAngle,
            })
        );
    }, [radius, pie]);

    const dataItemList: DataItemList[] = data.map((item, index) => ({
        name: item.name,
        color: colors[index % colors.length],
    }));

    return (
        <>
            <div className="div-pie-padre">
                <div className="div-pie">
                    <svg width={width} height={height}>
                        <g transform={`translate(${width / 2}, ${height / 2})`}>
                            {
                                arcs.map((arc, i) => {
                                    if (!arc) return null;
                                    return <path key={i} d={arc} fill={colors[i % colors.length]} />;
                                })
                            }
                        </g>
                    </svg>
                </div>
                <div className="div-pie" >
                    <div className="div-list-items-padre">
                        <div className="div-list-items">
                            {
                                dataItemList.map((item) => {
                                    return (
                                        <>
                                            <div className="div-item">
                                                <div className="div-color-ref" style={{ backgroundColor: item.color }}></div>
                                                <p>{item.name} </p>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PieChart