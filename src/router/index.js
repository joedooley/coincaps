import Vue from 'vue'
import Router from 'vue-router'

function route (path, name, view) {
	return {
		path: path,
		name: name,
		component: require(``)
	}
}