import $ from 'jquery'
import { throttle } from 'lodash'

import waypoints from '../../../node_modules/waypoints/lib/noframework.waypoints'

export default function Menu () {
    const
        icon      = $('.menu-toggle'),
        buttons   = $('.nav--mobile'),
        content   = $('.nav--primary'),
        interval  = 80,
        required  = 2,
        links     = content.find('a')
    let
        prevScroll    = 0,
        consecutives  = 0,
        prevDirection = 'down'

    function toggleMenu () {
        $('html').toggleClass('scroll-lock')
        icon.toggleClass('menu-toggle--close')
        content.toggleClass('open')
        buttons.toggleClass('nav-open')
    }

    function closeMenu () {
        const
            targetClass = 'open',
            isAnchor    = $(this).attr('href').startsWith('#')
        if (content.hasClass(targetClass) && isAnchor) toggleMenu()
    }

    function handleScroll (event) {
        const
            scroll    = $(window).scrollTop(),
            direction =  scroll > prevScroll ? 'down' : 'up'

        consecutives = direction == prevDirection
        ? consecutives + 1
        : 0

        if (consecutives == required) {
            if (direction === 'up') {
                buttons.addClass('visible')
            } else {
                buttons.removeClass('visible')
                // smButtons.removeClass('visible')
            }
        } else prevDirection = direction

        prevScroll = scroll
    }

    return (function () {
        icon.click(toggleMenu)
        links.click(closeMenu)

        $(window).scroll(throttle(handleScroll, interval))
    })()
}
