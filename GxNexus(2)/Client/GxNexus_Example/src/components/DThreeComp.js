import React from 'react';
import * as d3 from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import { renderBarGraph, sortAssignmentScoreData, getDataByAssessmentName, setGenerateInputData } from '../redux/tableSlice';
import { Paper, Typography } from '@mui/material';

//importing the pdf library
import jsPDF from 'jspdf';

const DThreeComp = (props) => {
    const tableName = useSelector((state) => state.files.tableName);
    const graphData = useSelector(state => state.files.uploadedTableData);
    const renderAssessment = useSelector(state => state.table.assessmentScore)
    const sortedData = useSelector(state => state.table.assessmentScoreData);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if(props.print){
            printFunction()
        }
        dispatch(getDataByAssessmentName({tableName: tableName, assessmentName: "ReduxTest"})).then((res) => {
            dispatch(setGenerateInputData("ReduxTest"));

        })
    },[])

    React.useEffect(() => {
        dispatch(sortAssignmentScoreData(graphData))
    }, [graphData]);

    React.useEffect(() => {
        graphProccessing()
    }, [sortedData]);

    const graphProccessing = () => {
        const data = sortedData.filter(({score}) => score > 0)
        const margin = {
            top: 20,
            right: 20, 
            bottom: 20,
            left: 100
        };
        const width = 800 - (margin.left + margin.right)
        const height = 550 - (margin.top + margin.bottom)

        const svg = d3.select(".test")

        svg.selectAll("*").remove();
        svg
            .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
            .attr('width', width)
            .attr('height', height)

        const xScale = d3
            .scaleLinear()
            .domain([0, 100])
            .range([0, width]);

        const group = svg
            .append('g')
            .attr('transform', `translate(${margin.left} ${margin.top})`);

        const yScale = d3
            .scaleBand()
            .domain(data.map(({ name }) => name))
            .range([0, height])
            .padding(0.5);

            const xAxis = d3
            .axisBottom(xScale);

            const yAxis = d3
            .axisLeft(yScale);

            group
            .append('g')
            .attr('transform', `translate(0 ${height})`)
            .call(xAxis);

            group
            .append('g')
            .call(yAxis);

            const groups = group
            .selectAll('g.group')
            .data(data, ({ name }) => name)
            .enter()
            .append('g')
            .attr('class', 'group')
            .attr('transform', ({ name }) => `translate(0 ${yScale(name)})`);
            
            groups
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', ({ score }) => xScale(score))
            .attr('height', yScale.bandwidth());

    }

    const printFunction = () => {
        let doc = new jsPDF();
        let printPage = document.getElementById("printableArea");
        doc.save(printPage)
    }

        return(
            <>
                <Paper id="printableArea" sx={{marginTop: 15, boxShadow: 20, height: '75vh', width: '60vw', p: 2}}>
                    <Typography variant='h4' sx={{p: 2}}>Assessment Score Results For Cohort</Typography> 
                    <svg className="test" />
                </Paper>
            </>
        )
    }

export default DThreeComp;