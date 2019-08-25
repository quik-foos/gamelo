import {
	Text,
	View,
	StyleSheet,
	Alert
} from 'react-native';
import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import ButtonSmall from './ButtonSmall';

class Map extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedTable: ""
		}
	}
	
	showId(){
		if(this.state.selectedTable){
			Alert.alert(this.state.selectedTable)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{this.showId()}
				<MapView
					style={styles.maps}
					initialRegion={{
						latitude: this.props.latitude,
						longitude: this.props.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}>
					{this.props.tables.map((table) => (
						<MapView.Marker
							key={table._id}
							coordinate={{
								latitude: table.location.lat,
								longitude: table.location.lng
							}}
							title={`${table.host.username}'s Boardgames Table`}
							description={`${table.startTime.split('T')[0]} @ ${table.startTime.split('T')[1].split(".000")[0]}`}>
							{/* --> ${table.endTime.split('T')[0]} @ ${table.endTime.split('T')[1]} */}
							<MapView.Callout onPress={() => this.setState({ selectedTable: table._id })} />
						</MapView.Marker>
					))}
				</MapView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	maps: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		position: 'absolute'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	}
}
)

const mapStateToProps = state => {
	return {
		latitude: state.location.latitude,
		longitude: state.location.longitude
	};
};

export default connect(mapStateToProps)(Map);