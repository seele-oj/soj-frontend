<script lang="ts">
    import './difficulty.css';
    import './../DarkMode.svelte';
  
    interface Props {
        major_level: number;
        minor_level: number;
        is_dark: boolean;
    }

    export let major_level: number = 1;
    export let minor_level: number = 0;

    function major() {
        if (major_level > 9)
            return "10";
        else
            return "0" + major_level.toString();
    }

    function alt() {
        switch (major_level) {
            case 1:
            case 2:
            case 3:
                return "Moon";
            case 4:
            case 5:
            case 6:
                return "Star";
            case 7:
            case 8:
                return "Stella";
            case 9:
            case 10:
                return "Meteor";
            default:
                return "Moon";
        }
    }

    function exp() {
        switch (major_level) {
            case 1:
            case 2:
            case 3:
                return "/moon.svg";
            case 4:
            case 5:
            case 6:
                return "/star.svg";
            case 7:
            case 8:
                return "/stella.svg";
            case 9:
            case 10:
                return "/meteor.svg";
            default:
                return "/moon.svg";;
        }
    }
</script>

<div class="difficulty">
    <img src={exp()} draggable="false" alt={alt()} />
    <div class="difficulty-text">
        {major()}
        <div class="digit">
            {"." + minor_level.toString()}
        </div>
    </div>
</div>