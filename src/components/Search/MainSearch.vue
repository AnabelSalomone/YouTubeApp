<template>
	<div>
		<search-bar>
		</search-bar>
		<search-result>
		</search-result>
	</div>
</template>

<script>
import SearchBar from '@/components/Search/SearchBar'
import SearchResult from '@/components/Search/SearchResult'


export default {
	name: 'Search',
	components: { searchBar: SearchBar, searchResult: SearchResult }
}
</script>