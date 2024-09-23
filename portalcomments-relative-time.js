if (window.jQuery) {
    (function ($) {
        $(document).ready(function () {
            let timeAgoElements = document.getElementsByClassName("timeago");
            let modifiedOnElements = document.getElementsByClassName("modifiedon");

            // Only implement below code if portal comments exist
            if (timeAgoElements.length > 0 && modifiedOnElements.length > 0) {
                TimePostedAgo(timeAgoElements, modifiedOnElements)
 
                // On page load - a very short delay is required before calling this function, otherwise the 'modifiedon' date appears in the wrong timezone which affects the 'timeago' element
                const initialLoadTimeout = setTimeout(TimePostedAgo, 10, timeAgoElements, modifiedOnElements);
                // Update 'time ago' every minute in real-time
                const interval = setInterval(TimePostedAgo, 60000, timeAgoElements, modifiedOnElements);

                // Clear interval and timeout function on unload
                $(window).on("unload", function () {
                    clearInterval(interval);
                    clearTimeout(initialLoadTimeout);
                });
            }
        });
    })(window.jQuery);
}
 
function TimePostedAgo(timeAgoElements, modifiedOnElements) {
    for (let i = 0; i < timeAgoElements.length; i++) {
        let modifiedOn = new Date(modifiedOnElements[i].dateTime);
        var now = dayjs()
        var fromValue = now.to(dayjs(modifiedOn))
        timeAgoElements[i].innerHTML = fromValue;
    }
};