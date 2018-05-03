(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = { 
		typeName: "radargauge",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		iconUrl: '/Images/radar-icon.png',
		getDefaultConfig: function(){ 
			return { 
				DataShape: "Table",
				Height: 150,
				Width: 150 
			} 
		},
		
		configOptions: function(){
			return [
				{
						title: "Format Symbol",
						mode: "format"
				}
			];
		}
	}

	function getConfig(){
		return {
				"type": "radar",
				"theme": "light",
				"dataProvider": [ 
				{
				"attribute": "1",
				"value": 156.9
				}, 
				{
				"attribute": "2",
				"value": 156.9
				}, 
				{
				"attribute": "3",
				"value": 156.9
				}, 
				{
				"attribute": "4",
				"value": 156.9
				}, 
				{
				"attribute": "5",
				"value": 156.9
				}, 
				{
				"attribute": "6",
				"value": 156.9
				} ],
				"valueAxes": [ {
				"axisTitleOffset": 20,
				"minimum": 0,
				"axisAlpha": 0.15,
				"guides": [{
				  "value": 0,
				  "toValue": 50,
				  "fillColor": "#c00",
				  "fillAlpha": 0.3
				}, {
				  "value": 50,
				  "toValue": 100,
				  "fillColor": "#c00",
				  "fillAlpha": 0.2
				}, {
				  "value": 100,
				  "toValue": 150,
				  "fillColor": "#cc0",
				  "fillAlpha": 0.2
				}, {
				  "value": 150,
				  "toValue": 200,
				  "fillColor": "#0c0",
				  "fillAlpha": 0.2
				}]
			  } ],
			  "startDuration": 2,
			  "graphs": [ {
				"balloonText": "[[value]] [[Units]]",
				"bullet": "round",
				"valueField": "value"
			  } ],
			  "categoryField": "attribute"
		}
	}
	
	symbolVis.prototype.init = function(scope, elem) { 
		this.onDataUpdate = dataUpdate;
		var labels;
		
		var container = elem.find('#container')[0];
		container.id = "radar_" + scope.symbol.Name;
		var chart = AmCharts.makeChart(container.id, getConfig());
		
		function convertoChart(data){
			return data.Rows.map(function(item, index){
				console.log(item);
				return {
					value: item.Value,
					attribute: labels[index],
					Units: item.Units
				}
			});

		}		
		
		
		function updateLabel(data){
			labels = data.Rows.map(function(item){
				return item.Label;
			});
		}
		
		function dataUpdate(data){
			if( !data) return;
			if( data.Rows[0].Label) updateLabel(data);
			
			var dataprovider = convertoChart(data);
			
			chart.dataProvider = dataprovider;			
			chart.validateData();

		}
		
		//Extra Credit
		this.onConfigChange = configChange;
		function configChange(oldConfig, newConfig){
			for(var propertyName in newConfig) {
				if(oldConfig[propertyName] !== newConfig[propertyName]){
					console.log(`${propertyName} Changed: (old) ${oldConfig[propertyName]} vs (new) ${newConfig[propertyName]}`);
				}
			}
		}
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
