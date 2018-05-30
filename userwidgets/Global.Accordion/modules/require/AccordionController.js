define(function() {

	return {
      applyBindings: function() {
        this.view.AccordionHeader.onClick = this.toggleAccordion.bind( this );
        this.view.AccordionHeader2.onClick = this.toggleAccordion2.bind( this );
        this.view.AccordionHeader3.onClick = this.toggleAccordion3.bind( this );
      },
      
      toggleAccordion: function() {
        if (this.view.AccordionContent.isVisible === true) {
          this.view.AccordionContent.isVisible = false;
        } else {
          this.view.AccordionContent.isVisible = true;
        }
      },
      
      toggleAccordion2: function() {
      if (this.view.AccordionContent2.isVisible === true) {
          this.view.AccordionContent2.isVisible = false;
        } else {
          this.view.AccordionContent2.isVisible = true;
        }
	},
      toggleAccordion3: function() {
      if (this.view.AccordionContent3.isVisible === true) {
          this.view.AccordionContent3.isVisible = false;
        } else {
          this.view.AccordionContent3.isVisible = true;
        }
	}
	};
});