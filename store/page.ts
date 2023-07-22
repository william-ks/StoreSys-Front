import { defineStore } from "pinia";

export const usePage = defineStore('page', () => {
    const pageTitle = useState('pageTitle', () => '');

    function setPageTitle(newTitle: string) {
        pageTitle.value = newTitle
    }

    return {
        pageTitle,
        setPageTitle
    }
})